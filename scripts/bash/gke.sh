#!/bin/bash

if [ $ENV_PROJECT_STAGE != "development" ]; then
  SERVICE_ACCOUNT_PATH="$CLOUDSDK_ROOT_DIR/service-account.json";
  echo $ENV_GCLOUD_AUTH | base64 --decode > $SERVICE_ACCOUNT_PATH;
  gcloud auth activate-service-account --key-file=$SERVICE_ACCOUNT_PATH;
  gcloud container clusters get-credentials $ENV_GCLOUD_PROJECT_NAME-$ENV_PROJECT_STAGE --zone us-central1-a --project $ENV_GCLOUD_PROJECT_ID;
fi