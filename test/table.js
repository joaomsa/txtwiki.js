'use strict';

var txtwiki = require('../txtwiki.js');

(function(){
	QUnit.module('Table parsing');

	function parse(then, expected){
		equal(txtwiki.parseWikitext(then), expected);
	}

	test('Simple tables', function(){
		parse([
			'{|',
			'| A',
			'| B',
			'|-',
			'| C',
			'| D',
			'|}',].join('\n'),
			'');
		parse([
			'{|',
			'| A || B',
			'|-',
			'| C || D',
			'|}',].join('\n'),
			'');
		parse([
			'{| class="Now with some properties" border=\'1\'',
			'| A',
			'|-',
			'| B',
			'|}',].join('\n'),
			'');
		parse([
			'{| class="wikitable"',
			'| style="background: #ABCDEF;" | A',
			'|-',
			'| formatB',
			'|}',].join('\n'),
			'');
		parse([
			'{| border="1"',
			'|-',
			'|format modifier (not displayed) |These all  |(including the pipes) |go into  |the first cell||second cell',
			'|-',
			'|format  |These all  ||format |go into  |the second cell',
			'|}',].join('\n'),
			'');
		parse([
			'some preceding text {| class="wikitable"',
			'| A',
			'|}',].join('\n'),
			'some preceding text {| class="wikitable" | A |}');
		parse([ 
			'                    {| class="wikitable"',
			'| A',
			'|}',].join('\n'),
			'');
	});

	test('Nested tables', function(){
		parse([
			'{| border="1"',
			'| &alpha;',
			'| style="text-align: center;"| cell2',
			'{| border="2" style="background: #ABCDEF;" <!-- The nested table must be on a new line -->',
			'| NESTED',
			'|-',
			'| TABLE',
			'|}K',
			'| style="vertical-align:bottom;"| the original table again',
			'|}',].join('\n'),
			'');
	});

	test('Not closed properly', function(){
		parse([
			'{| border="1"',
			'| A',
			'',
			'',
			'',
			'',
			'Some text',].join('\n'),
			'');
		parse([
			'{| border="1"',
			'| A',
			'!',
			'',
			'',
			'',
			'Some text',].join('\n'),
			'');
		parse([
			'{| border="1"',
			'|A',
			'||}',
			'',
			'',
			'',
			'Some text',].join('\n'),
			'');
		parse([
			'{| border="1"',
			'| A',
			'|-',
			'',
			'',
			'',
			'Some text',].join('\n'),
			'Some text');
		parse([
			'{| border="1"',
			'| A',
			'|-}',
			'',
			'',
			'',
			'Some text',].join('\n'),
			'Some text');
		parse([
			'{| border="1"',
			'| A',
			'|+',
			'',
			'',
			'',
			'Some text',].join('\n'),
			'Some text');
	});
}());
