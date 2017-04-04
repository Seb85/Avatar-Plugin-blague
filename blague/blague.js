var Promise = require('q').Promise;

require('colors');

exports.action = function(data, callback){
	
	info("Blague du jour from:", data.client.yellow);
	var maxJokeId = Config.modules.blague.max_joke_id;
	var url = 'http://www.takatrouver.net/blagues/index.php?id=' + Math.floor(Math.random() * maxJokeId + 1);
	http_request(url)
	.then(body => scraper(body))
	.then(function(blague) { 
		Avatar.speak(blague, data.client, function(){ 
			Avatar.Speech.end(data.client);
	   });
	})
	.catch(function(err) {
		Avatar.speak(err, data.client, function(){ 
			Avatar.Speech.end(data.client);
	   });
	});
	
	callback();
}



function scraper(body) {
	
	return new Promise(function (resolve, reject) {
		  
		var $ = require('cheerio').load(body, { xmlMode: false, normalizeWhitespace: false, ignoreWhitespace: true, lowerCaseTags: true });
		var blague = $('#Layer11 table table:nth-child(2)').text();
		if (!blague) {
			return reject('Désolé je n\'ai pas trouvé de blague');
		}
		
		resolve (blague);
	});
	
}



function http_request (url) {
	
	return new Promise(function (resolve, reject) {
		
		var request = require('request');
		request({ 'uri' : url, 'encoding': 'binary' }, function (err, response, body) {
		
			if (err || response.statusCode != 200) {
			  return reject ('Désolé je n\'ai pas trouvé de blague');
			}

			resolve(body);
		});
		
	});
	
}
