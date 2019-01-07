# Web Component Starter Kit
This repo is a starter kit to creating a web app based on web component. It's come with basic router for single page application. The components are using Lit-Html as rendering component.

## Features
* Starter template with basic router for single page app
* Web manifest
* Workbox for service worker
* Webpack for bundler


## Webpack Config
Config files separate into 3 different files. 
* `webpack.config.common.js` is for common config that share both development and production mode.
* `webpack.config.prod.js` is for production config
* `webpack.config.dev.js` is for development config

## Service Worker
Service worker is generated by Webpack with Workbox plugin by injecting the bundles and source file from `src/service-worker.js`. You can add your service worker codes in `src/service-worker.js`.