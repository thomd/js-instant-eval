#!/usr/bin/env bats

export PATH=$(pwd):$PATH
TEST_SCRIPT="_script.js"

setup(){
  touch $TEST_SCRIPT
}

@test "invoking 'js' without arguments should print usage info" {
  run js
  [ "$status" -eq 1 ]
  [ "${lines[0]::6}" == "Usage:" ]
}

@test "invoking 'console.log()' with node.js should print to console" {
  echo "console.log('foo');" > $TEST_SCRIPT
  run js --no-watch $TEST_SCRIPT
  [ "$status" -eq 0 ]
  [ "${lines[0]}" == "foo" ]
}

@test "invoking 'console.log()' with rhino should print to console using print()" {
  echo "console.log('foo');" > $TEST_SCRIPT
  run js --no-watch --engine rhino $TEST_SCRIPT
  [ "$status" -eq 0 ]
  [ "${lines[0]}" == "foo" ]
}

@test "invoking 'print()' with rhino should print to console" {
  echo "print('foo');" > $TEST_SCRIPT
  run js --no-watch --engine rhino $TEST_SCRIPT
  [ "$status" -eq 0 ]
  [ "${lines[0]}" == "foo" ]
}

@test "invoking 'alert()' with rhino should print to console" {
  echo "alert('foo');" > $TEST_SCRIPT
  run js --no-watch --engine rhino $TEST_SCRIPT
  [ "$status" -eq 0 ]
  [ "${lines[0]}" == "foo" ]
}

@test "invoking 'print()' with node.js should print to console using console.log()" {
  echo "print('foo');" > $TEST_SCRIPT
  run js --no-watch $TEST_SCRIPT
  [ "$status" -eq 0 ]
  [ "${lines[0]}" == "foo" ]
}

@test "invoking 'alert()' with node.js should print to console using console.log()" {
  echo "alert('foo');" > $TEST_SCRIPT
  run js --no-watch $TEST_SCRIPT
  [ "$status" -eq 0 ]
  [ "${lines[0]}" == "foo" ]
}

@test "invoking erroneous javascript with node.js should throw an reference error" {
  echo "console.log(foo);" > $TEST_SCRIPT
  run js --no-watch $TEST_SCRIPT
  [ "$status" -ne 0 ]
  [ "${lines[3]::15}" == "ReferenceError:" ]
}

teardown(){
  rm $TEST_SCRIPT
}
