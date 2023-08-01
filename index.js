/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

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

    // loop over each item in the data
    for (let game of games){
        
        // Set-up
        let gameCard = document.createElement("div");
        gameCard.classList.add("game-card");

        // Customization: Custom message depending on goal being met or not, made more sense than a single type of message
        let goalsMet = `
        <p> The $${game["goal"].toLocaleString('en-US')} goal ${game["pledged"] >= game["goal"] ? "has been met!": "has not been met."}
        For this game, ${game["backers"].toLocaleString('en-US')} backers have pledged $${game["pledged"].toLocaleString()} total.</p>
        `;

        // Adding info to page
        const gameInfo = `
            <img src = "${game["img"]}" alt = "${game["name"]}\'s cover image." class = "game-img">
            <h1>${game["name"]}</h1>
            <p>${game["description"]}</p>
            ${goalsMet}
        `;
        gameCard.innerHTML = gameInfo;
        document.getElementById("games-container").appendChild(gameCard);
    }
}

// Customization: function adds games to an html table when called 
function addGamesToTable(games) {

    // Set-up
    let gameTable = document.createElement("table");
    let tableInfo = `<tr>
        <th>Name</th>
        <th>Description</th>
        <th>Pledged</th>
        <th>Goal</th>
        <th>Backers</th>
    </tr>`

    // Loops through each game and sets up the info as expected
    for (let game of games){
        tableInfo += ` <table><tr>
            <th> ${game["name"]} </th>
            <th> ${game["description"]} </th>
            <th> $${game["pledged"].toLocaleString()}</th>
            <th> $${game["goal"].toLocaleString()} </th>
            <th> ${game["backers"].toLocaleString()} </th>
        </tr>`
    }

    // Adding info to page
    gameTable.innerHTML = tableInfo;
    document.getElementById("games-container").appendChild(gameTable);
}

// Function Call -> Moved to 248
// addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const contributions = GAMES_JSON.reduce( (accum, game) => {return accum + game["backers"];}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `<p> ${contributions.toLocaleString()} </p>`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const raised = GAMES_JSON.reduce( (accum, game) => {return accum + game["pledged"];}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `<p> $${raised.toLocaleString()} </p>`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const games = GAMES_JSON.length;
gamesCard.innerHTML = `<p> ${games.toLocaleString()} </p>`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// Customization: record last click to ensure switching to table format works on current button
let lastClick = "all";

// show only games that do not yet have enough funding
function filterUnfundedOnly() {

    // Setup
    deleteChildElements(gamesContainer);
    lastClick = "unfunded";
    let tableBtn = document.getElementById("table-btn");

    // use filter() to get a list of games that have not yet met their goal
    let unfundedGames = GAMES_JSON.filter(game => { return game["pledged"] < game["goal"];});

    // use the function we previously created to add the unfunded games to the DOM, depending on specificied format
    tableBtn.checked ? addGamesToTable(unfundedGames) : addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    
    // Setup
    deleteChildElements(gamesContainer);
    lastClick = "funded";
    let tableBtn = document.getElementById("table-btn");

    // use filter() to get a list of g\ames that have met or exceeded their goal
    let fundedGames = GAMES_JSON.filter(game => { return game["pledged"] >= game["goal"];});

    // use the function we previously created to add the unfunded games to the DOM, depending on specificied format
    tableBtn.checked ? addGamesToTable(fundedGames) : addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {

    // Setup
    deleteChildElements(gamesContainer);
    lastClick = "all"
    let tableBtn = document.getElementById("table-btn");

    // add all games from the JSON data to the DOM, depending on specificied format
    tableBtn.checked ? addGamesToTable(GAMES_JSON) : addGamesToPage(GAMES_JSON);
}

// Customization: Sets up the Table depending on the last button clicked
function setTable() {
    switch (lastClick) {
        case "funded":
            filterFundedOnly();
            break;
    
        case "unfunded":
            filterUnfundedOnly();
            break;

        default:
            showAllGames();
            break;
    }
}
// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");
const tableBtn = document.getElementById("table-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

// Customization: Event listener for new button
tableBtn.addEventListener("change", () => tableBtn.checked != "checked" ? tableBtn.checked = "checked" : tableBtn.checked = null);
tableBtn.addEventListener("change", setTable);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let unfundedGames = GAMES_JSON.filter(game => { return game["pledged"] < game["goal"];}).length;

// create a string that explains the number of unfunded games using the ternary operator
let unfundedStr = `A total of $${GAMES_JSON.reduce( (accum, game) => {return accum + game["pledged"];}, 0).toLocaleString()} has been raised for ${GAMES_JSON.length} games. 
Currently, ${unfundedGames} ${unfundedGames > 1 ? "games remain" : "game remains"} unfunded. 
We need your help to fund ${unfundedGames > 1 ? "these amazing games" : "this amazing game"}!`;

// create a new DOM element containing the template string and append it to the description container

const description = document.createElement("p");
const descriptionText = document.createTextNode(unfundedStr);
description.appendChild(descriptionText);

descriptionContainer.appendChild(description);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [firstGame, secondGame, ...otherGames] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameElement = document.createElement("p");
const firstGameName = document.createTextNode(`${firstGame["name"]}`);
firstGameElement.appendChild(firstGameName);
firstGameContainer.appendChild(firstGameElement);

// do the same for the runner up item
const secondGameElement = document.createElement("p");
const secondGameName = document.createTextNode(`${secondGame["name"]}`);
secondGameElement.appendChild(secondGameName);
secondGameContainer.appendChild(secondGameElement);

// Late function call ensures list of games is sorted by pledged
addGamesToPage(GAMES_JSON);