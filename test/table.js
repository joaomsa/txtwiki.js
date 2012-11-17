'use strict';

var txtwiki = require('../txtwiki.js');

(function(){
	function parse(then, expected){
		equal(txtwiki.parseWikitext(then), expected);
	}

	test('Table parsing', function(){
		parse([
			'{|',
			'| A',
			'| B',
			'|-',
			'| C',
			'| D',
			'|}',].join('\n'), '');
		parse([
			'{|',
			'| A || B',
			'|-',
			'| C || D',
			'|}',].join('\n'), '');
	});
}());
