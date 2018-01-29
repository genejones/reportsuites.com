"use strict";
var pbkdf2 = require('./node_modules/pbkdf2/lib/sync-browser.js');
var wsse = require('../node-wsse');
var request = require('browser-request');
var handlebars = require('handlebars/runtime');
var union = require('lodash/union');
var keys = require('lodash/keys');
var FileSaver = require('file-saver');
/*
Adding
//var md5 = require('create-hash/md5')
//var rmd160 = require('ripemd160')
to sync-browser.js saves us ~45KB
This is because we won't ever use those hashing methods
MD5 is particular is terrible.
*/
window.Handlebars = handlebars;
window.omnibus = window.omnibus || {};
window.omnibus.pbkdf2 = pbkdf2;
window.omnibus.wsse = wsse;
window.omnibus.request = request;
window.omnibus.lodash = {};
window.omnibus.lodash.keys = keys;
window.omnibus.lodash.union = union;
window.omnibus.FileSaver = FileSaver;