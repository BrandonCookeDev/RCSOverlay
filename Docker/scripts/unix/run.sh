#!/bin/bash

function abs_path {
	cd "$1" 2>/dev/null || return $?  # cd to desired directory; if fail, quell any error messages but return exit status
	echo "`pwd -P`" # output full, link-resolved path
}

CURDIR=$(pwd)
BASEDIR=$(dirname $0)
ROOTDIR=$(abs_path $BASEDIR/../../..)
APP_DIR=/app/current/
IMAGE_NAME=$(cat $BASEDIR/../ImageName.txt)

echo 

echo Running Docker container $IMAGE_NAME


cd $ROOTDIR
docker run $@ \
	-p 8081:8081 \
	--mount type=bind,source=$ROOTDIR/StreamControl_0_4b,target=$APP_DIR/StreamControl_0_4b \
	-it $IMAGE_NAME
cd $CURDIR

