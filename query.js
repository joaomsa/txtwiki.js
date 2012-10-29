"use strict";

function query(){
	var queryTerm = document.getElementById("queryTerm").value;

	var queryURL = "http://en.wikipedia.org/w/api.php?" +
		"action=query&" +
		"prop=revisions&" +
		"rvprop=content&" +
		"rvexpandtemplates&" +
		"format=json&" +
		"callback=callback&" +
		"indexpageids&" +
		"redirects&" +
		"titles=" + encodeURIComponent(queryTerm);

	var request = document.createElement("script");
	request.setAttribute("src", queryURL);
	document.getElementsByTagName('head')[0].appendChild(request);
}

function callback(data){
	var content = document.getElementById("content");

	var pageid = data["query"]["pageids"][0];
	if (pageid == "-1"){
		content.innerHTML = "Page not found";
		return;
	}
	var wikitext = data["query"]["pages"][pageid]["revisions"][0]["*"];

	var parsed = txtwiki.parseWikitext(wikitext);

	parsed = parsed.replace(/>/g, "&gt;");
	parsed = parsed.replace(/</g, "&lt;");
	parsed = parsed.replace(/\n/g, "<br>");

	content.innerHTML = parsed;
}
