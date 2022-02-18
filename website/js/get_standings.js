fetch("https://api-nba-v1.p.rapidapi.com/standings/standard/2021/conference/east", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
		"x-rapidapi-key": "18cf13de41mshad96d0527c35d2fp10e1b3jsnd25c71b24bbf"
	}
})
.then(response => {
	return response.json();
}).then(json => {
	console.log(json);
})
.catch(err => {
	console.error(err);
});
