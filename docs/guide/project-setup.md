# Project Setup

For a good project boilerplate, see [searchkit](https://github.com/searchkit/searchkit/)

First follow the steps to get protractor installed onto your project [Protractor setup](https://angular.github.io/protractor/#/protractor-setup)

Then install xenon, ts-node via npm.

```sh
npm install --save-dev xenon ts-node
```

Here is an [example protractor conf](https://github.com/searchkit/searchkit/blob/master/test/e2e/conf/protractor.conf.js).

Notice that in `onPrepare` method, `ignoreSynchronization` is `true` for non angular apps, `false` for Angular Apps. Synchronization waits until angular has fully digested to proceed with the test. If not set to `false` for non angular apps, the test runner will not continue.

## Install Typings
With typescript, you need to install tsd and these typings:

```sh
tsd install angular-protractor selenium-webdriver jasmine --save
```
