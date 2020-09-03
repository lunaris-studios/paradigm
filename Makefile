# MAKEFILE
#
# @author      Sam Craig <sam@lunaris.io>
# @link        https://github.com/lunaris-studios/paradigm
# ------------------------------------------------------------------------------

.EXPORT_ALL_VARIABLES:

# Display general help about this command
.PHONY: help
help:
	@echo ""
	@echo "$(PROJECT) Makefile."
	@echo ""
	@echo "The following commands are available:"
	@echo ""
	@echo "    make build      : Build production distributions"
	@echo ""
	@echo "    make clean      : Remove build / test artifacts"
	@echo ""
	@echo "    make dev        : Start Nx development server"
	@echo ""
	@echo "    make format     : Format code"
	@echo ""
	@echo "    make generate   : Generate code"
	@echo ""
	@echo "    make skaffold   : Run the Nx development server in Skaffold"
	@echo ""
	@echo "    make update     : Update project dependencies"
	@echo "    make update-nix : Update niv dependencies"
	@echo "    make update-npm : Update npm dependencies"
	@echo ""

# === Entities ===

# URL of the remote repository
REPOSITORY := https://github.com/lunaris-studios/paradigm

# Project owner
OWNER := lunaris-studios

# Project name
PROJECT := paradigm

# Project version
VERSION := 0.0.0

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

# === Build ===

# Build production Gatsby payload
.PHONY: build
build:
	@npm run build

# === Clean ===

# Remove build / test artifacts
.PHONY: clean
clean:
	@npm run clean

# === Dev ===

# Start Gatsby development server
.PHONY: dev
dev:
	@npm run dev

# === Format ===

# Format code
.PHONY: format
format:
	@npm run format

# === Gererate ===

# Generate code
.PHONY: generate
generate:
	@npm run generate

# === Skaffold ===

.PHONY: skaffold
skaffold-dev:
	skaffold dev --port-forward=true --force=false

# === Update ===

# Update all project dependencies
.PHONY: update
update:
	@$(MAKE) -s update-niv
	@$(MAKE) -s update-npm

# Update niv dependencies
.PHONY: update-niv
update-niv:
	@niv update

# Update npm packages
.PHONY: update-npm
update-npm:
	@npm run update
