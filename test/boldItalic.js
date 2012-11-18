'use strict';

var txtwiki = require('../txtwiki.js');

(function(){
	QUnit.module('Bold and italic parsing');

	function parse(then, expected){
		equal(txtwiki.parseWikitext(then), expected);
	}

	test('Simple cases', function(){
		parse(
			"''Italic''",
			"Italic");
		parse(
			"'''Bold'''",
			"Bold");
		parse(
			"'''''Bold Italic'''''",
			"Bold Italic");
		parse(
			"''Bold '''Italic'' Mismatched'''",
			"Bold Italic Mismatched");
	});

	test('Unmatched quotes', function(){
		parse(
			"hello ' blah",
			"hello ' blah");
		parse(
			"hello '' blah",
			"hello blah");
		parse(
			"hello ''' blah",
			"hello blah");
		parse(
			"hello l'''amour'' l'''ouest''' blah",
			"hello l'amour louest blah");
		parse(
			"hello mon'''amour'' blah",
			"hello mon'amour blah");
		parse(
			"hello '''amour'' '''blah '''blah",
			"hello 'amour blah blah");
		parse(
			"hello ''''amour''' now ''italics unbalanced, but that's ok",
			"hello 'amour now italics unbalanced, but that's ok");
		parse(
			"hello ''''amour''' now, '''bold unbalanced, but that's ok",
			"hello 'amour now, bold unbalanced, but that's ok");
		parse(
			"hello ''''amour''' now '''''bold and italics unbalanced, so invoke this special case",
			"hello ''amour now bold and italics unbalanced, so invoke this special case");
		parse(
			"hello ''''' blah",
			"hello blah");
		parse(
			"hello '''''''''' blah",
			"hello ''''' blah");
		parse(
			"hello '''bold '''''''''' blah",
			"hello bold ''''' blah");
		parse(
			"He read and reread the ''King James Bible,'' Aesop's ''Fables,'' Bunyan's ''Pilgrim's Progress,'' Defoe's ''Robinson Crusoe,'' and Franklin's ''Autobiography.'''",
			"He read and reread the King James Bible, Aesop's Fables, Bunyan's Pilgrim's Progress, Defoe's Robinson Crusoe, and Franklin's Autobiography.'");
	});
}());
