/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

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
    
    // loop over each item in the data
    games.forEach(function(game) {
         // create a new div element, which will become the game card
        let div = document.createElement("div");

        // add the class game-card to the list
        div.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        div.innerHTML = `
            <p>Name: ${game.name}</p>
            <p>Description: ${game.description}</p>
            <p>Pledged: ${game.pledged}</p>
            <p>Goal: ${game.goal}</p>
            <p>Backers: ${game.backers}</p>
            <img src="${game.img}" alt="${game.name}" class="game-img" />
        `; 
        // append the game to the games-container
        gamesContainer.appendChild(div);
    });   
}
// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);

// later, we'll call this function using a different list of games

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
// on GAMES_JSON array
const totalContributions = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.backers;
  }, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `<p>${totalContributions}</p>`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.pledged;
  }, 0);

// format the totalRaised with commas for every thousand
const formattedTotalRaised = totalRaised.toLocaleString();  

// set inner HTML using template literal
raisedCard.innerHTML = `<p>$${formattedTotalRaised}</p>`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.reduce( (acc, game) => {
    return acc + 1;
  }, 0);

// set inner HTML using template literal
gamesCard.innerHTML = `<p>${totalGames}</p>`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfundedGames = GAMES_JSON.filter ( (game) => {
        return game.pledged < game.goal;
      });

    // log the unfundedGames array to the console
    console.log("Unfunded Games:", unfundedGames);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let fundedGames = GAMES_JSON.filter ( (game) => {
        return game.pledged > game.goal;
      });

    // log the fundedGames array to the console
    console.log("Funded Games:", fundedGames);

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

function resetButtonStyles() {
    unfundedBtn.style.fontWeight = "normal";
    fundedBtn.style.fontWeight = "normal";
    allBtn.style.fontWeight = "normal";
}

// add event listeners with the correct functions to each button
document.getElementById("unfunded-btn").addEventListener("click", filterUnfundedOnly);
document.getElementById("funded-btn").addEventListener("click", filterFundedOnly);
document.getElementById("all-btn").addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedNumber = GAMES_JSON.filter((game) => game.pledged < game.goal);

// count the number of unfunded games
const totalUnfunded = unfundedNumber.length;

// log the total number of unfunded games to the console
console.log("Total Unfunded Games:", totalUnfunded);

// create a string that explains the number of unfunded games using the ternary operator
const result = totalUnfunded >= 1 ? "remain" : "remains";

const companyInfoDiv = document.createElement("p");
companyInfoDiv.innerHTML = `
A total of $${formattedTotalRaised} has been raised for ${totalGames} games. Currently, ${totalUnfunded} games 
${result} unfunded. We need your help to fund these amazing games!
`; 

// create a new DOM element containing the template string and append it to the description container
descriptionContainer.appendChild(companyInfoDiv);

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
const [first, second] = sortedGames;
console.log(first)
console.log(second)

// create a new element to hold the name of the top pledge game, then append it to the correct element
let firstFund = document.createElement("p");
firstFund.innerHTML = `
${first.name}
`; 

firstGameContainer.appendChild(firstFund);

// do the same for the runner up item
let secondFund = document.createElement("p");
secondFund.innerHTML = `
${second.name}
`; 
secondGameContainer.appendChild(secondFund);