/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
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
 * Challenge 3: dd data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (var i = 0; i<games.length; i++) {
        // create a new div element, which will become the game card
        const gameInfo = document.createElement("div");

        // add the class game-card to the list
        gameInfo.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        const display = `
        <img src = ${games[i].img} class="game-img" /> 
        <h1>${ games[i].name }</h1> 
        <p>${games[i].description}</p>
        <p>Backers: ${games[i].backers}</p> `;
        gameInfo.innerHTML = display;

        // append the game to the games-container
        gamesContainer.append(gameInfo);
    }
}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON)
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.backers;
  }, 0);

// Animating the numbers for total contributions!:
var counter=setInterval(animateCounter, 20);
var currNumber=1;
function animateCounter(){
    // grab the contributions card element
    const contributionsCard = document.getElementById("num-contributions");

    // set the inner HTML using a template literal and toLocaleString to get a number with commas
    contributionsCard.innerHTML = currNumber.toLocaleString(); 
    if (totalContributions - currNumber >= 100) {
      currNumber+=100;
    } else if (totalContributions - currNumber >= 10) {
      currNumber+=10;
    } else if (totalContributions - currNumber >= 1) {
      currNumber+=1;
    } else if (currNumber===totalContributions) {
      clearInterval(counter);
    }
}

// grab the amount raised card, then use reduce() to find the total amount raised
const totalPledged = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.pledged;
  }, 0);

// Animating the numbers for total raised!:
var counter2=setInterval(animateCounter2, 50);
var currNumber2=1;
function animateCounter2(){
    // grab the amount raised card
    const raisedCard = document.getElementById("total-raised");
    // set the inner HTML using a template literal and toLocaleString to get a number with commas
    raisedCard.innerHTML = "$"+ currNumber2.toLocaleString(); 
    if (totalPledged - currNumber2 >= 10000) {
      currNumber2+=10000;
    } else if (totalPledged - currNumber2 >= 1000) {
      currNumber2+=1000;
    } else if (totalPledged - currNumber2 >= 100) {
      currNumber2+=100;
    } else if (totalPledged - currNumber2 >= 10) {
      currNumber2+=10;
    } else if (totalPledged - currNumber2 >= 1) {
      currNumber2+=1;
    } else if (currNumber2===totalPledged) {
      clearInterval(counter2);
    }
}


// Animating the numbers for total no. of games!:
var counter3=setInterval(animateCounter3, 100);
var currNumber3=1;
function animateCounter3(){
    // grab number of games card
    const gamesCard = document.getElementById("num-games");
    // set the inner HTML using a template literal and toLocaleString to get a number with commas
    gamesCard.innerHTML = currNumber3.toLocaleString(); 
    if (GAMES_JSON.length - currNumber3 >= 1) {
      currNumber3+=1;
    } else if (currNumber3===GAMES_JSON.length) {
      clearInterval(counter3);
    }
}

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let underFundedGames = GAMES_JSON.filter ( (game) => {
        return game.goal > game.pledged;
      });
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(underFundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let fundedGames = GAMES_JSON.filter ( (game) => {
        return game.goal <= game.pledged;
      });

    // use the function we previously created to add unfunded games to the DOM
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
fundedBtn.addEventListener("click", filterFundedOnly );
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numUnderFunded = GAMES_JSON.reduce( (acc, game) => {
    (game.goal > game.pledged) ? acc+=1 : acc+=0
    return acc;
  }, 0);

const numFunded = GAMES_JSON.reduce( (acc, game) => {
    (game.goal > game.pledged) ? acc+=0 : acc+=1
    return acc;
  }, 0);

const costOfFunded = GAMES_JSON.reduce( (acc, game) => {
    (game.goal > game.pledged) ? acc+=0: acc+=game.pledged
    return acc;
  }, 0);


// create a string that explains the number of unfunded games using the ternary operator
const explaination =`A total of $${totalPledged.toLocaleString()} has been raised for ${(GAMES_JSON.length).toLocaleString()} games. Currently ${numUnderFunded} ${numUnderFunded <=1 ? "game" : "games"} remains underfunded. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
descriptionContainer.append(explaination);
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
const [firstGame, secondGame, ...restGames] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
firstGameContainer.append(firstGame.name);
// do the same for the runner up item
secondGameContainer.append(secondGame.name);
