#!/usr/bin/env bash
#set -e
[ -n "$JS_DEBUG" ] && set -x

if [ $# -eq 0 ] || [ ! -f ${!#} ]; then
  echo "Usage: js [--no-watch] [--engine=node|rhino] script.js" 1>&2 && exit 1;
fi

ENGINE='node'

case "$(uname)" in
  CYGWIN*) CYGWIN=true ;;
  Linux*) LINUX=true ;;
  *) ;;
esac

if [ $CYGWIN ]; then
  TMPFILE=$(cygpath -pw `mktemp /tmp/js.XXXXXX`)
else
  TMPFILE=`mktemp /tmp/js.XXXXXX`
fi

function compile {
  if [ "node" = "$ENGINE" ]; then
    perl -pe 's/(^ *)(print\(|alert\()/\1console.log(/g' $FILE > $TMPFILE
    export NODE_PATH="$PWD/node_modules"
    if [ $LINUX ]; then
      nodejs $TMPFILE
    else
      node $TMPFILE
    fi
  else
    perl -pe 's/(^ *)(console.log\(|alert\()/\1print(/g' $FILE > $TMPFILE
    rhino -f $TMPFILE
  fi
}

function sha {
  if [ $CYGWIN ] || [ $LINUX ]; then
    echo `ls -lR | md5sum`
  else
    echo `ls -lR | md5`
  fi
}
old_sha=$(sha)

function watch {
  while true; do
    if [[ $(sha) != $old_sha ]]; then
      [ $CYGWIN ] && printf "\033c" || clear
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
  [ $CYGWIN ] && printf "\033c" || clear
  compile
  watch
fi

