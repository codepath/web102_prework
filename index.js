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
    for(let i=0; i < games.length; i++){
        const game = games[i];

        const gamesCard = document.createElement('div');

        gamesCard.classList.add('game-card');

        gamesCard.innerHTML=`
        <img src=${game.img} class=game-img></img>
        <h3>${game.name}</h3>
        <p>${game.description}</p>
        `;
        gamesContainer.appendChild(gamesCard);
    }
}

addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce( (acc, GAMES_JSON) => {
    return acc + GAMES_JSON.backers;
}, 0);
// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = (totalContributions.toLocaleString('en-US'))

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce( (acc1, GAMES_JSON) => {
    return acc1 + GAMES_JSON.pledged;
}, 0);
// set inner HTML using template literal
raisedCard.innerHTML = (totalRaised.toLocaleString('en-US'))


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.reduce( (sum, GAMES_JSON) => {
    return sum + 1;
}, 0);
gamesCard.innerHTML = (totalGames.toLocaleString('en-US'))

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let gamesNotMetPledgedGoal = GAMES_JSON.filter ( (gamrUnfunded) => {
        return gamrUnfunded.pledged < gamrUnfunded.goal;
      });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(gamesNotMetPledgedGoal);
}


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let gamesMetPledge = GAMES_JSON.filter ( (gameFunded) => {
        return gameFunded.pledged >= gameFunded.goal;
      });
    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(gamesMetPledge);
}
// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    let showAll = GAMES_JSON.filter ( (game) => {
        return game;
      });

    addGamesToPage(showAll);
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
const unfundedGames = GAMES_JSON.reduce( (acc1, game1) => {
    let num;
    if (game1.pledged<game1.goal) {
        num =1;
      } else {
        num=0;
      }
    return acc1 + num;
}, 0);

// create a string that explains the number of unfunded games using the ternary operator
let unfundedGameString = `A total of $${totalRaised.toLocaleString()} has been raised for ${totalGames} ${unfundedGames>1 ? 'games' : 'game'}.
Currently, ${unfundedGames} ${unfundedGames>1 ? 'games' : 'game'} remains unfunded.
We need your help to find these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
const paragraph = unfundedGameString;
descriptionContainer.append(paragraph);
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
const[fir, sec, ...rest] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
firstGameContainer.append(`${fir.name}`);
// do the same for the runner up item
secondGameContainer.append(`${sec.name}`);
