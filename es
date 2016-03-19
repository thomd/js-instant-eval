#!/usr/bin/env bash
set -e
[ -n "$ES_DEBUG" ] && set -x

if [ $# -eq 0 ] || [ ! -f ${!#} ]; then
  echo "Usage: es script.js" 1>&2 && exit 1;
fi

FILE=$1
TMPFILE=`mktemp /tmp/es.XXXXXX`
test -d node_modules && ln -s "$PWD/node_modules" /tmp/node_modules

function compile {
  babel --presets es2015,react $FILE -o $TMPFILE
  node $TMPFILE
}

function sha {
  echo `ls -lR | md5`
}
old_sha=$(sha)

function watch {
  while true; do
    if [[ $(sha) != $old_sha ]]; then
      clear
      compile
      old_sha=$(sha)
    fi
    sleep 1
  done
}

trap exit SIGINT
clear
compile
watch

