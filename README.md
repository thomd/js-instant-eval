# js-instant-eval

`js(1)` is a shell script that watches and evaluates javascript using [node][1] or [rhino][2] javascript engine.

## Install

    brew install node
    brew install rhino
    make test
    make install

## Usage

Default javascript engine is node

    js script.js
    js --engine rhino script.js

[1]: http://nodejs.org/
[2]: https://developer.mozilla.org/de/docs/Rhino

