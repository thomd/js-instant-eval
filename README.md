# js-instant-eval

[![Build Status](https://travis-ci.org/thomd/js-instant-eval.png)](https://travis-ci.org/thomd/js-instant-eval)

`js(1)` is a shell script that **watches** and **evaluates** javascript using [node][1] or [rhino][2] javascript engine.

## Install

    brew install node
    brew install rhino
    make test
    make install

On `Cygwin` you need to set `CYGWIN=nodosfilewarning` in the global Windows environment (Control Panel > System > Advanced > Environment
Variables).

## Usage

Default javascript engine is node

    js script.js
    js --engine rhino script.js

## on ES6

`es(1)` is an experimental evaluation of ES6. Install [babel][3] and es2015 preset:

    npm i babel-cli babel-preset-es2015 babel-preset-react
    es script.js

[1]: http://nodejs.org/
[2]: https://developer.mozilla.org/de/docs/Rhino
[3]: https://babeljs.io/
