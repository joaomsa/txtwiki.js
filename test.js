'use strict';

var testrunner = require('qunit');

testrunner.options.log.assertions = false;

testrunner.run({
		code: './txtwiki.js',
		tests: [
			'./test/boldItalic.js',
		]
});
