/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
	games.forEach((game) => {
		const gameCard = document.createElement("div");

		gameCard.setAttribute("class", "game-card");

		let imgPath = game.img;

		let info = `<h2>${game.name}</h2>
					<p>${game.description}</p>
					<img class="game-img" src=${imgPath} />`;

		gameCard.innerHTML = info;

		gamesContainer.appendChild(gameCard);
	}); // foreach

	// gamesContainer.append(table);
} // addGamesToPage()

//================================================================================

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

addGamesToPage(GAMES_JSON);

//================================================================================

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

//================================================================================

function getTotalContributions() {
	const total = GAMES_JSON.reduce((acc, game) => {
		return acc + game.backers;
	}, 0);

	const formattedTotal = total.toLocaleString();

	contributionsCard.innerHTML = formattedTotal;
} // getTotalContributions()

//================================================================================

getTotalContributions();

//================================================================================

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

//================================================================================

function getTotalAmountRaised() {
	const total = GAMES_JSON.reduce((acc, game) => {
		return acc + game.pledged;
	}, 0);

	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	});

	const formattedTotal = formatter.format(total);

	return formattedTotal;
} // GetTotalAmountRaised()

getTotalAmountRaised();

//================================================================================

const totalRaised = getTotalAmountRaised();

// set inner HTML using template literal
raisedCard.innerHTML = totalRaised;

//================================================================================

function getTotalGamesPlayed() {
	const numUnfundedGames = filterUnfundedOnly().length;

	const numFundedGames = filterFundedOnly().length;

	const total = numFundedGames + numUnfundedGames;

	return total;
} // getTotalGamesPlayed()

//================================================================================

// grab number of games card and set its inner HTML
const totalGamesPlayed = getTotalGamesPlayed();

const gamesCard = document.getElementById("num-games");

gamesCard.innerHTML = totalGamesPlayed;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
	deleteChildElements(gamesContainer);

	const unfundedGames = GAMES_JSON.filter((game) => {
		return game.pledged < game.goal;
	}); // filter()

	return unfundedGames;
} // filterUnfundedOnly()

//================================================================================

// show only games that are fully funded
function filterFundedOnly() {
	deleteChildElements(gamesContainer);

	const fundedGames = GAMES_JSON.filter((game) => {
		return game.pledged >= game.goal;
	}); // filter()

	return fundedGames;
} // filterFundedOnly()

//=====================================================================

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

function appendTableBody(tableBody, table, games) {
	// deleteChildElements(tableContainer);
	games.forEach((game) => {
		const contentRow = document.createElement("tr");

		const nameCell = document.createElement("td");

		nameCell.style.textAlign = "left";

		nameCell.innerHTML = game.name;

		const descriptionCell = document.createElement("td");

		descriptionCell.style.textAlign = "left";

		descriptionCell.innerHTML = game.description;

		const posterCell = document.createElement("td");

		const poster = document.createElement("img");

		poster.setAttribute("src", `${game.img}`);

		posterCell.appendChild(poster);

		contentRow.append(nameCell);

		contentRow.append(descriptionCell);

		contentRow.append(posterCell);

		tableBody.appendChild(contentRow);
	}); // foreach

	table.appendChild(tableBody);
} // appendTableBody()

//=====================================================================

function appendTableHeader(tableHeader, table) {
	const nameHeaderCell = document.createElement("th");

	nameHeaderCell.innerHTML = "Game";

	tableHeader.appendChild(nameHeaderCell);

	const descriptionHeaderCell = document.createElement("th");

	descriptionHeaderCell.innerHTML = "Description";

	tableHeader.appendChild(descriptionHeaderCell);

	const posterHeaderCell = document.createElement("th");

	posterHeaderCell.innerHTML = "Image";

	tableHeader.appendChild(posterHeaderCell);

	table.appendChild(tableHeader);
} // appendTableHeader()

//=====================================================================

// add event listeners with the correct functions to each button

function unfundedBtnClick() {
	unfundedBtn.addEventListener("click", () => {
		const unfundedGames = filterUnfundedOnly();

		const table = document.createElement("table");

		const tableHeader = document.createElement("thead");

		appendTableHeader(tableHeader, table);

		const tableBody = document.createElement("tbody");

		appendTableBody(tableBody, table, unfundedGames);

		gamesContainer.appendChild(table);
	}); // addEventListener()
} // unfundedBtnClick()

unfundedBtnClick();
//================================================================================

function fundedBtnClick() {
	fundedBtn.addEventListener("click", () => {
		const fundedGames = filterFundedOnly();

		const table = document.createElement("table");

		const tableHeader = document.createElement("thead");

		appendTableHeader(tableHeader, table);

		const tableBody = document.createElement("tbody");

		appendTableBody(tableBody, table, fundedGames);

		gamesContainer.appendChild(table);
	}); // addEventListener()
} // fundedBtnClick()

fundedBtnClick();

//================================================================================

function allBtnClick() {
	allBtn.addEventListener("click", () => {
		const table = document.createElement("table");

		const tableHeader = document.createElement("thead");

		appendTableHeader(tableHeader, table);

		const tableBody = document.createElement("tbody");

		const fundedGames = filterFundedOnly();

		const unfundedGames = filterUnfundedOnly();

		appendTableBody(tableBody, table, fundedGames);

		appendTableBody(tableBody, table, unfundedGames);

		gamesContainer.appendChild(table);
	});
} // allBtnClick()

allBtnClick();

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
function getTotalUnfundedGames() {
	const unfundedGames = filterUnfundedOnly();

	const total = unfundedGames.length;

	return total;
} // getTotalUnfundedGames()

//================================================================================

// create a string that explains the number of unfunded games using the ternary operator
function getUnfundedGamesDescription() {
	const totalRaised = getTotalAmountRaised();

	const remainingUnfundedGames = getTotalUnfundedGames();

	const totalGames = getTotalGamesPlayed();

	const string1 =
		`A total of ${totalRaised} has been raised for ${totalGames} games. ` +
		`Currently, 1 game remains unfunded.  ` +
		`We need your help to fund this amazing game!`;

	const string2 =
		`A total of ${totalRaised} has been raised for ${totalGames} games. ` +
		`Currently, ${remainingUnfundedGames} games remain unfunded.  ` +
		`We need your help to fund these amazing games!`;

	const isOneGameFunded = remainingUnfundedGames === 1;

	return isOneGameFunded ? string1 : string2;
} // getUnfundedGamesDescription()

//================================================================================

// create a new DOM element containing the template string and append it to the description container

function displayUnfundedGamesDescription() {
	const para = document.createElement("p");

	const description = getUnfundedGamesDescription();

	para.append(description);

	descriptionContainer.appendChild(para);
} // displayUnfundedGamesDescription()

displayUnfundedGamesDescription();

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
	return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

const [first, second] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element

function displayTopFundedGame() {
	const para = document.createElement("p");

	para.append(first.name);

	firstGameContainer.appendChild(para);
} // displayTopFundedGame()

displayTopFundedGame();

//============================================================================

// do the same for the runner up item

function displayRunnerUp() {
	const para = document.createElement("p");

	para.append(second.name);

	secondGameContainer.appendChild(para);
} // displayRunnerUp()

displayRunnerUp();

//================================================================================
