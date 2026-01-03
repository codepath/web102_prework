/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
//import { createElement } from 'react';
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
    for (const game of games) {
        const newElement = document.createElement('div')
        newElement.classList.add("game-card")
        newElement.innerHTML = `
            <img src = "${game.img}" class = "game-img"> 
            <h3> Name: ${game.name} </h3>
            <p> Description: ${game.description} </p>
            <p> Pledged: ${game.pledged} </p>
            `
        gamesContainer.appendChild(newElement)
        
    }

}

addGamesToPage(GAMES_JSON)


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, game) => {
    return acc + game.backers
}, 0);

contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`

// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce ((acc, game) => {
    return acc + game.pledged
}, 0)
// set inner HTML using template literal
raisedCard.innerHTML = `${totalRaised.toLocaleString()}`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = GAMES_JSON.length

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter ((game) => {
        return game.pledged < game.goal
    })

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage (unfundedGames)

}


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter ((game) => {
        return game.pledged > game.goal
    })


    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage (fundedGames)
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage (GAMES_JSON)

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly)
fundedBtn.addEventListener("click", filterFundedOnly)
allBtn.addEventListener ("click", showAllGames)

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numUnfunded = GAMES_JSON.reduce ((acc, game) => {
    if (game.pledged < game.goal) {
        return acc + 1;
    } else {
        return acc;
    }
}, 0)

const numFunded = GAMES_JSON.reduce ((acc, game) => {
    return acc + game.pledged
}, 0)

// create a string that explains the number of unfunded games using the ternary operator
let unfundedStr = numUnfunded === 0? `A total of $${numFunded.toLocaleString()} have been raised for all 11 games` : `A total of $${numFunded.toLocaleString()} have been raised for all 11 games. Currently, ${numUnfunded} games remain unfunded.`;

// create a new DOM element containing the template string and append it to the description container
const unfundedElement = document.createElement('p');
unfundedElement.innerHTML = unfundedStr;
descriptionContainer.appendChild(unfundedElement);

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
const [topGame, runnerUp] = sortedGames

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGameElement = document.createElement('p')
topGameElement.innerHTML = topGame.name
firstGameContainer.append(topGameElement) //what is the difference b/w using append and appendChild here?


// do the same for the runner up item
const runnerUpElement = document.createElement('p')
runnerUpElement.innerHTML = runnerUp.name
secondGameContainer.append(runnerUpElement)
