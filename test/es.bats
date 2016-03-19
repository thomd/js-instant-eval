#!/usr/bin/env bats

export PATH=$(pwd):$PATH
TEST_SCRIPT="_script.js"

setup(){
  touch $TEST_SCRIPT
}

@test "invoking 'es' without arguments should print usage info" {
  run es
  [ "$status" -eq 1 ]
  [ "${lines[0]::6}" == "Usage:" ]
}

@test "invoking 'console.log()' with es(1) should print to console" {
  echo "console.log('foo');" > $TEST_SCRIPT
  run es --no-watch $TEST_SCRIPT
  [ "$status" -eq 0 ]
  [ "${lines[0]}" == "foo" ]
}

@test "invoking an ES2016 Arrow function with es(1) should print to console" {
echo "let pow = x => x*x; console.log(pow(2));" > $TEST_SCRIPT
  run es --no-watch $TEST_SCRIPT
  [ "$status" -eq 0 ]
  [ "${lines[0]}" == "4" ]
}

teardown() {
  rm $TEST_SCRIPT
}
