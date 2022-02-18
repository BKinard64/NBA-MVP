let teamsById =
{
	0: "Atlanta Hawks",
	1: "Boston Celtics",
	2: "",
	3: "Brooklyn Nets",
	4: "Charlotte Hornets",
	5: "Chicago Bulls",
	6: "Cleveland Cavaliers",
	7: "Dallas Mavericks",
	8: "Denver Nuggets",
	9: "Detroit Pistons",
	10: "Golden State Warriors",
	11: "",
	12: "",
	13: "Houston Rockets",
	14: "Indiana Pacers",
	15: "Los Angeles Clippers",
	16: "Los Angeles Lakers",
	17: "",
	18: "Memphis Grizzlies",
	19: "Miami Heat",
	20: "Milwaukee Bucks",
	21: "Minnesota Timberwolves",
	22: "New Orleans Pelicans",
	23: "New York Knicks",
	24: "Oklahoma City Thunder",
	25: "Orlando Magic",
	26: "Philadelphia 76ers",
	27: "Phoenix Suns",
	28: "Portland Trail Blazers",
	29: "Sacramento Kings",
	30: "San Antonio Spurs",
	31: "",
	32: "",
	33: "",
	34: "",
	35: "",
	36: "",
	37: "Toronto Raptors",
	38: "",
	39: "Utah Jazz",
	40: "Washington Wizards"
}

function buildStandingsTable(conference) {
	let table = document.createElement("table");

	let fields = ["Rank", "Team", "Record", "GB"];
	let headRow = document.createElement("tr");
	fields.forEach(function(field) {
		let headCell = document.createElement("th");
		headCell.appendChild(document.createTextNode(field));
		headRow.appendChild(headCell);
	});
	table.appendChild(headRow);

	fetch("https://api-nba-v1.p.rapidapi.com/standings/standard/2021/conference/" + conference, {
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

		let sortedStandings =
		[
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null
		]
		json.api.standings.forEach(function(object) {
			let row = document.createElement("tr");
			let fields = ["rank", "teamId", "win", "gamesBehind"];
			fields.forEach(function(field) {
				let cell = document.createElement("td");
				if (field == "rank") {
					cell.appendChild(document.createTextNode(object.conference[field]));
					cell.style.textAlign = "center";
				} else if (field == "teamId") {
					cell.appendChild(document.createTextNode(teamsById[object[field] - 1]));
				} else if (field == "win") {
					let record = object[field] + "-" + object["loss"] + " (" + object["winPercentage"] + ")";
					cell.appendChild(document.createTextNode(record));
				} else {
					cell.appendChild(document.createTextNode(object[field]));
				}
				row.appendChild(cell);
			});
			sortedStandings[object.conference.rank - 1] = row;
		});

		sortedStandings.forEach(function(row) {
			table.appendChild(row);
		});

		document.querySelector("#" + conference + "-standings")
							.appendChild(table);
	})
	.catch(err => {
		console.error(err);
	});
}

buildStandingsTable("east");
buildStandingsTable("west");
