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
    games.forEach((game) => {

        // create a new div element, which will become the game card
        let newDiv = document.createElement('div');

        // add the class game-card to the list
        newDiv.classList.add('game-card');

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        const newDivContent = `
            <img class="game-img" src="${game.img}" alt="game-photo">
            <h3>${game.name}</h3>
            <p>${game.description}\n</p> 
            <p>Supported by ${game.backers} people</p>
        `;

        newDiv.innerHTML = newDivContent;

        var words = game.name.split(" ");
        let searchName = words.reduce( (acc, word) => {
            return acc + "+" + word
        }, "");
        searchName = searchName.slice(1);
        // console.log(searchName);

        let url = `https://www.google.com/search?q=${searchName}&oq=${searchName}`
        newDiv.addEventListener("click", () => window.open(url, "_blank"));

        // append the game to the games-container
        gamesContainer.appendChild(newDiv);
    })
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
const totalContributions = GAMES_JSON.reduce( (acc, game) => { 
    return acc + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas

const contributionsCardContent = `${totalContributions.toLocaleString('en-US')}`;
contributionsCard.innerHTML = contributionsCardContent;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const raisedAmount = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.pledged;
}, 0);

// set inner HTML using template literal
const raisedCardContent = `$${raisedAmount.toLocaleString('en-US')}`;
raisedCard.innerHTML = raisedCardContent;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const gamesCardContent = `${GAMES_JSON.length}`
gamesCard.innerHTML = gamesCardContent

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfundedList = GAMES_JSON.filter( (game) => {
        return game.pledged < game.goal;
    });
    // console.log(unfundedList.length);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedList);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let fundedList = GAMES_JSON.filter( (game) => {
        return game.pledged >= game.goal;
    });
    // console.log(fundedList.length);

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedList);
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
    let unfundedList = GAMES_JSON.filter( (game) => {
        return game.pledged < game.goal;
    });

// create a string that explains the number of unfunded games using the ternary operator
const descriptionContent = `A total of $${raisedAmount.toLocaleString('en-US')} has been raised for ${GAMES_JSON.length > 1 ? `${GAMES_JSON.length} games` : `${GAMES_JSON.length} game`}. 
Currently, ${unfundedList.length == 0 ? "All games are funded. Thank you for " 
            : unfundedList.length == 1 ? "1 game remains unfunded. We need " 
            : `${unfundedList.length} games remain unfunded. We need `} your help to fund these amazing games!`;
// create a new DOM element containing the template string and append it to the description container

let newParagraph = document.createElement('p');

newParagraph.innerHTML = descriptionContent

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
let [firstGame, secondGame,] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
let firstGameElement = document.createElement('p')

firstGameElement.innerHTML = firstGame.name

firstGameContainer.appendChild(firstGameElement)

// do the same for the runner up item
let secondGameElement = document.createElement('p')

secondGameElement.innerHTML = secondGame.name

secondGameContainer.appendChild(secondGameElement)

// Searchbar function
function searchGame() {
    deleteChildElements(gamesContainer);

    let input = document.getElementById('searchbar').value
    input = input.toLowerCase();
    console.log(input)
    
    let searchedList = GAMES_JSON.filter( (game) => {
        return game.name.toLowerCase().includes(input);
    });

    console.log(searchedList);

    addGamesToPage(searchedList);
}

let searchInput = document.getElementById("searchbar");
searchInput.addEventListener("keyup", () => {
    searchGame();
});