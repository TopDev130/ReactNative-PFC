Push For Champagne
=================

### CI Status

<a href='https://circleci.com/gh/manandmoon/pfc-mobile/' target='_blank'><img src="https://circleci.com/gh/manandmoon/pfc-mobile/tree/master.svg?style=shield&circle-token=00b5e6abb88cecc5e78204c324e32b86eb62a07e" /></a>

### How to install

```bash
$ npm install -g npm@3.x
$ npm install
```

### Running on device

Application is automatically deployed to HockeyApp, check the updates, they are synced with development branch.

### Structure

All interesting app logic is located in the `src` folder. For iOS specific features (including app start-up) refer to `iOS` folder written in Objective-C.

### Interacting with NPM

> This is likely to be extracted from this project soon, but for the sake of speed, it's included here as well.

In order to use NPM private registry where we store our stuff, please visit `https://github.com` and generate personal access token (with default scopes, do not change them). Then, copy that token and assign it to `NPM_TOKEN` variable, like below:

```bash
$ export NPM_TOKEN=<token>
$ npm install
```

It's advisable to add in the above line to your `bash_profile` to have it defined every time you interact with npm.

Note -> you will need to have at least read access to repository hosting modules you want to get.
