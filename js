#!/usr/bin/env bash
#set -e
[ -n "$JS_DEBUG" ] && set -x

if [ $# -eq 0 ] || [ ! -f ${!#} ]; then
  echo "Usage: js [--no-watch] [--engine=node|rhino] script.js" 1>&2 && exit 1;
fi

ENGINE='node'
TMPFILE=`mktemp /tmp/js.XXXXXX` || exit 1

function compile {
  if [ "node" = "$ENGINE" ]; then
    sed 's/print/console.log/g' $FILE > $TMPFILE
    node $TMPFILE
  else
    sed 's/console.log/print/g' $FILE > $TMPFILE
    rhino -f $TMPFILE
  fi
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
    -e|--engine)
      ENGINE=$1
      shift
      ;;
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
  clear
  compile
  watch
fi

