console.log("Code is executed");
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
    for (let i = 0; i < games.length; i++) {
        // create a new div element, which will become the game card
        const gameCard = document.createElement("div");

        // add the class game-card to the list
        gameCard.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game, including image and at least 2 other attributes
        gameCard.innerHTML = `
            <img src="${games[i].img}" alt="${games[i].name}" class="game-img" />
            <h2>${games[i].name}</h2>
            <p>Description: ${games[i].description}</p>
            <p>Backers: ${games[i].backers}</p>
        `;

        // append the game to the games-container
        gamesContainer.appendChild(gameCard);
    }
}



// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((sum, game) => sum + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `<h3>${totalContributions.toLocaleString()}</h3>`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `<h3>$${totalRaised.toLocaleString()}</h3>`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.length;

// set inner HTML using template literal
gamesCard.innerHTML = `<h3>${totalGames}</h3>`;



/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // Use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // Use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // Use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // Use the function we previously created to add the funded games to the DOM
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// Grab the description container from the DOM
const descriptionContainer = document.getElementById("description-container");

// Use reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.reduce((count, game) => {
  // Check if the game is unfunded and increment the count accordingly
  return game.pledged < game.goal ? count + 1 : count;
}, 0);

// Calculate the total number of games available
// Remove the existing declaration of 'totalGames'
// const totalGames = GAMES_JSON.length;

// Create a string describing the funding status using a ternary operator
const displayStr = `A total of $${totalRaised.toLocaleString()} has been raised for ${totalGames} ${totalGames === 1 ? 'game' : 'games'}. Currently, ${unfundedGamesCount} ${unfundedGamesCount === 1 ? 'game remains' : 'games remain'} unfunded. We need your help to fund these amazing games!`;

// Create a new paragraph element to display the information
const newParagraph = document.createElement('p');

// Set the text content of the paragraph to the display string
newParagraph.textContent = displayStr;

// Append the new paragraph to the description container
descriptionContainer.appendChild(newParagraph);
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
// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...rest] = sortedGames;

// Secret key component 1
const firstWordMostFunded = firstGame.name.split(" ")[0];

// Secret key component 2
const firstWordSecondMostFunded = secondGame.name.split(" ")[0];
// create a new element for the top funded game
const firstGameElement = document.createElement('div');
firstGameElement.innerHTML = `
    <p>Name: ${firstGame.name}</p>
`;

// append the top funded game element to the first game container
firstGameContainer.appendChild(firstGameElement);

// create a new element for the second most funded game
const secondGameElement = document.createElement('div');
secondGameElement.innerHTML = `
    <p>Name: ${secondGame.name}</p>
`;

// append the second most funded game element to the second game container
secondGameContainer.appendChild(secondGameElement);

// Secret key component 3
const restArray = [...rest];
const restValue = restArray.length;
