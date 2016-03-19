#!/usr/bin/env bash
set -e
[ -n "$ES_DEBUG" ] && set -x

if [ $# -eq 0 ] || [ ! -f ${!#} ]; then
  echo "Usage: es script.js" 1>&2 && exit 1;
fi

TMPFILE=`mktemp /tmp/es.XXXXXX`
test -d node_modules && test ! -d /tmp/node_modules && ln -s "$PWD/node_modules" /tmp/node_modules

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

while test $# -ne 0; do
  arg=$1
  shift
  case $arg in
    --no-watch)
      NOWATCH=true
      ;;
    *)
      FILE=$arg
      ;;
  esac
done

if [ $NOWATCH ]; then
  compile
else
  trap exit SIGINT
  [ $CYGWIN ] && printf "\033c" || clear
  compile
  watch
fi
