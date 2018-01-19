# reportsuites.com - Tools for Adobe Analytics

[![Coverage Status](https://coveralls.io/repos/github/genejones/reportsuites.com/badge.svg?branch=master)](https://coveralls.io/github/genejones/reportsuites.com?branch=master)
[![Build Status](https://travis-ci.org/genejones/reportsuites.com.svg?branch=refactor)](https://travis-ci.org/genejones/reportsuites.com)

This website uses NPM extensively. Jest, TravisCI, and Coveralls are used to provide test coverage data.

There are no JS assets on index.html other than Google Tag Manager.
Export.html uses a browserified bundle of client-handler, excel-handler, and excel-helpers. [msexcel-builder](https://github.com/protobi/msexcel-builder) is used to export to Excel.

The [production site](https://reportsuites.com) may be several builds behind the most recent. The [staging site](https://chione.genejon.es) will be the most recent build or even ahead of it!
