.EXPORT_ALL_VARIABLES:

# === Shell Configuration ===

SHELL := /bin/bash

UNAME_OS := $(shell uname -s | tr '[:upper:]' '[:lower:]')
UNAME_ARCH := $(shell uname -m | tr '[:upper:]' '[:lower:]')

TMP_BASE := vendor
TMP := $(TMP_BASE)
TMP_BIN = $(TMP)/bin
TMP_VERSIONS := $(TMP)/versions

# === Environment ===

STAGE ?= development

ROOT_DIR := $(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))
CONFIG_DIR := $(ROOT_DIR)/config
SETTINGS_DIR := $(CONFIG_DIR)/settings
SKAFFOLD_DIR := $(CONFIG_DIR)/skaffold

SKAFFOLD_FILENAME := $(SKAFFOLD_DIR)/$(STAGE).skaffold.yaml

# Export `.tool-versions` entries as environment variables
# with the pattern "<DEPENDENCY_NAME>_VERSION=<DEPENDENCY_VERSION>"
# to the temp file `.tool-versiions.env`
include .tool-versions.env

.PHONY: .tool-versions.env
.tool-versions.env: .tool-versions
	@(sed -e 's/\(.*\)\ \(.*\)/\1_VERSION=\2/g' | tr '[:lower:]' '[:upper:]') < $< > $@

include .env

.PHONY: .env
.env: $(SETTINGS_DIR)/$(STAGE).json
	@(python ./scripts/python/jsontoenv.py) < $< > $@

.PHONY: .env.yaml
.env.yaml: $(SETTINGS_DIR)/$(STAGE).json
	@(python ./scripts/python/jsontoyaml.py) < $< > $@

# === Niv ===

.PHONY: niv-update
niv-update:
	niv update

# === Skaffold Development ===

.PHONY: skaffold-dev
skaffold-dev:
	skaffold dev --port-forward=true --force=false --default-repo=$(DOCKER_REPO)

.PHONY: skaffold-dev-development
skaffold-dev-development:
	@$(MAKE) -s skaffold-dev 

.PHONY: skaffold-dev-staging
skaffold-dev-staging:
	@$(MAKE) -s skaffold-dev STAGE=staging

.PHONY: skaffold-dev-production
skaffold-dev-production:
	@$(MAKE) -s skaffold-dev STAGE=production

# === Skaffold Debug ===

.PHONY: skaffold-debug
skaffold-debug:
	skaffold debug -v info --port-forward --rpc-http-port 43603

.PHONY: skaffold-debug-development
skaffold-debug-development:
	@$(MAKE) -s skaffold-debug 

.PHONY: skaffold-debug-staging
skaffold-debug-staging:
	@$(MAKE) -s skaffold-debug STAGE=staging

.PHONY: skaffold-debug-production
skaffold-debug-production:
	@$(MAKE) -s skaffold-debug STAGE=production

# === Skaffold Deployment ===

.PHONY: skaffold-run
skaffold-run:
	skaffold run --default-repo=gcr.io/$(ENV_GCLOUD_PROJECT_ID)

.PHONY: skaffold-run-development
skaffold-run-development:
	@$(MAKE) -s skaffold-run  

.PHONY: skaffold-run-staging
skaffold-run-staging:
	@$(MAKE) -s skaffold-run STAGE=staging

.PHONY: skaffold-run-production
skaffold-run-production:
	@$(MAKE) -s skaffold-run STAGE=production	

# === Skaffold Delete ===

.PHONY: skaffold-delete
skaffold-delete:
	@skaffold delete

.PHONY: skaffold-delete-development
skaffold-delete-development:
	@$(MAKE) -s delete 

.PHONY: skaffold-delete-staging
skaffold-delete-staging:
	@$(MAKE) -s delete STAGE=staging

.PHONY: skaffold-delete-production
skaffold-delete-production:
	@$(MAKE) -s delete STAGE=production

# === Config ===

.PHONY: config
config:
	@$(MAKE) .env
	@$(MAKE) .env.yaml

# === Generate ===

.PHONY: generate
generate:
	@$(MAKE) -s config

# === Scripts ===

.PHONY: script
script:
	@. ./scripts/$(SCRIPT_TYPE)/$(SCRIPT_NAME).sh

.PHONY: helm
helm:
	@$(MAKE) -s script SCRIPT_TYPE=bash SCRIPT_NAME=helm

.PHONY: gke
gke:
	@$(MAKE) -s script SCRIPT_TYPE=bash SCRIPT_NAME=gke

.PHONY: setup
setup:
	@$(MAKE) -s gke
	@$(MAKE) -s helm

# === Aliases ===

.PHONY: dev
dev:
	@$(MAKE) -s skaffold-dev-development

.PHONY: development
development:
	@$(MAKE) -s skaffold-dev-development

.PHONY: stage
stage:
	@$(MAKE) -s skaffold-dev-staging

.PHONY: staging
staging:
	@$(MAKE) -s skaffold-dev-staging

.PHONY: prod
prod:
	@$(MAKE) -s skaffold-dev-production

.PHONY: production
production:
	@$(MAKE) -s skaffold-dev-production

.PHONY: update
update:
	@$(MAKE) -s niv-update	
