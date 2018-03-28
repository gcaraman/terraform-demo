#!/usr/bin/env bash

APP_PATH=$(dirname $(cd $(dirname $0); pwd -P))
SCREENSHOTS_DIR="${APP_PATH}/tests/e2e/screenshots/"
S3_PATH="s3://cnci-metadata/codepipeline-tmp"

function on_fail() {
    if [ -d "${SCREENSHOTS_DIR}" ]; then
        echo "Sync screenshots directory to S3 ..."
        aws s3 sync ${SCREENSHOTS_DIR} ${S3_PATH} --acl 'public-read'
    fi

    exit 1
}

echo "Running 'recink run terraform' ..."
recink run terraform -vv
