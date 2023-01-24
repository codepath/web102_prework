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
        let gameCard = document.createElement("div");

        // add the class game-card to the list
        gameCard.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        gameCard.innerHTML =
            `   <div class="game-card">
            <img class="game-img" src= "${games[i].img}" >
            <h2>
                ${games[i].name}
            </h2>
            <p class="description">${games[i].description}</p>
            <p class="pledged"> Pledged: ${games[i].pledged}</p>
            <p class="goal"> Goal: ${games[i].goal}</p>
            </div>
        `;

        // append the game to the games-container
        //let gamesContainer = document.querySelector(".games-container");
        gamesContainer.appendChild(gameCard);

    }
}
addGamesToPage(GAMES_JSON)

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
let contributionsCardCount = GAMES_JSON.reduce((total, game) => {
    return total + game.backers
}, 0).toLocaleString('en-US');

// set the inner HTML using a template literal and toLocaleString to get a number with commas

contributionsCard.innerHTML = `<p> ${contributionsCardCount} <p/>`

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal
// set the inner HTML using a template literal and toLocaleString to get a number with commas

let raisedCardAmount = GAMES_JSON.reduce((total, game) => {
    return total + game.pledged
}, 0).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });


raisedCard.innerHTML = `<p> ${raisedCardAmount} <p/>`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

let gamesCardTotal = GAMES_JSON.length.toLocaleString('en-US');
gamesCard.innerHTML = `<p> ${gamesCardTotal} <p/>`

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfundedGames = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal;
    })

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames)
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let fundedGames = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal;
    })

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames)
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

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let unfundedCount = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal
}).length;

// create a string that explains the number of unfunded games using the ternary operator
let numUnfundedGameStr = `A total of ${raisedCardAmount.toLocaleString('en-US')}
                        has been raised for ${GAMES_JSON.length} games. Currently,
                        ${unfundedCount} games ${unfundedCount == 1 ? "remains" : "remain"} unfunded.
                        We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
let unfundedItem = document.createElement("div");

unfundedItem.innerHTML = numUnfundedGameStr
descriptionContainer.appendChild(unfundedItem)

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");


let gameSorted = GAMES_JSON.slice().sort((a, b) => (a.pledged < b.pledged) ? 1 : -1);

// use destructuring and the spread operator to grab the first and second games

let [firstGame, secondGame, ...rest] = gameSorted;


// create a new element to hold the name of the top pledge game, then append it to the correct element
let gameOne = document.createElement("p");
const gameOneDisplay = 
    `
    <div class="gameOne">
    <p class="gameOneP"> ${firstGame.name}</p>
    <div/>
    `;

gameOne.innerHTML = gameOneDisplay
firstGameContainer.appendChild(gameOne)



// do the same for the runner up item

let gameTwo = document.createElement("p");
const gameTwoDisplay = 
    `
    <div class="gameTwo">
    <p class="gameTwoP"> ${secondGame.name}</p>
    <div/>
    `;

gameTwo.innerHTML = gameTwoDisplay
firstGameContainer.appendChild(gameTwo)