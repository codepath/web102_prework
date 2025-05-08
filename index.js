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
  // loop over each item in the data
  for (let i = 0; i < games.length; i++) {
    // create a new div element, which will become the game card
    const game = document.createElement("div");
    // add the class game-card to the list
    game.classList.add("game-card");
    // set the inner HTML using a template literal to display some info
    // about each game
    game.innerHTML = `
        <img src="${games[i].img}" class="game-img" alt="${games[i].name}"/>
        <br/>
        <br/>
        <h2>${games[i].name}</h2>
        <br/>
        <p>${games[i].description}</p>
        <br/>
        <p>Backers: ${games[i].backers}</p>
        `;

    // append the game to the games-container
    gamesContainer.append(game);
  }
  // TIP: if your images are not displaying, make sure there is space
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
const totalContributions = GAMES_JSON.reduce(
  (acc, game) => acc + game.backers,
  0
);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

// set the inner HTML using a template literal and toLocaleString to get a number with commas

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce(
  (acc, game) => acc + game.pledged, // sum the pledged amounts
  0 // start with 0
);
// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.length; // get the number of games
gamesCard.innerHTML = `${totalGames.toLocaleString()}`; // set inner HTML

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have not yet met their goal
  const unfundedGames = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal; // check if pledged amount is less than goal
  });
  // use the function we previously created to add the unfunded games to the DOM
  addGamesToPage(unfundedGames); // call the function to add unfunded games
  console.log(unfundedGames); // log the unfunded games to the console
}
// call the filterUnfundedOnly function to see the result
filterUnfundedOnly();

// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have met or exceeded their goal
  const fundedGames = GAMES_JSON.filter((games) => {
    return games.pledged >= games.goal;
  });

  // use the function we previously created to add unfunded games to the DOM
  addGamesToPage(fundedGames); // call the function to add funded games
  console.log(fundedGames);
}
filterFundedOnly(); // call the function to see the result

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);

  // add all games from the JSON data to the DOM
  addGamesToPage(GAMES_JSON);
}
showAllGames(); // call the function to see the result
// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly); // add event listener for unfunded button
fundedBtn.addEventListener("click", filterFundedOnly); // add event listener for funded button
allBtn.addEventListener("click", showAllGames); // add event listener for all button

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter((game) => {
  return game.pledged < game.goal; // check if pledged amount is less than goal
}).length;
// create a string that explains the number of unfunded games using the ternary operator
const totalRaisedAmount = GAMES_JSON.reduce(
  (acc, game) => acc + game.pledged,
  0
);
const totalGamesCount = GAMES_JSON.length;
const displayStr = `A total of $${totalRaisedAmount.toLocaleString()} has 
been raised for ${totalGamesCount} games. Currently, ${unfundedGamesCount} game${
  unfundedGamesCount !== 1 ? "s" : ""
} remain${unfundedGamesCount !== 1 ? "" : "s"} unfunded.
We need your help to fund these amazing games!`;
// create a new DOM element containing the template string and append it to the description container
const descriptionElement = document.createElement("p"); // create a new paragraph element
descriptionElement.textContent = displayStr; // set the text content of the paragraph
descriptionContainer.appendChild(descriptionElement); // append the paragraph to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});
// sort the games by pledged amount in descending order
const [firstGame, secondGame] = [...sortedGames];

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameElement = document.createElement("p");
firstGameElement.textContent = firstGame.name;
firstGameContainer.appendChild(firstGameElement);

// do the same for the runner-up item
const secondGameElement = document.createElement("p");
secondGameElement.textContent = secondGame.name;
secondGameContainer.appendChild(secondGameElement);

console.log("Secret Key component 1:", firstGame.name.split(" ")[0]);
console.log("Secret Key component 2:", secondGame.name.split(" ")[0]);

// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item
