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
    for (let game of games) {
        // create a new div element, which will become the game card
        const gameCard =  document.createElement("div");
         // add the class game-card to the list
        gameCard.classList.add("game-card");
         // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" alt="${game.name}"/>
            <h3 class="game-name">${game.name}</h3>
            <p class="game-description">${game.description}</p>
            <p><strong>Backers:</strong> ${game.backers}</p>
            <p><strong>Pledged:</strong> $${game.pledged.toLocaleString()}</p>
         `;

        // ✅ Add red border to unfunded games
        if (game.pledged < game.goal) {
            gameCard.style.border = "4px solid red";
        }

        // Add green border to funded games
        if (game.pledged >= game.goal) {
            gameCard.style.border = "4px solid green";
        }


       // append the game to the games-container        
       gamesContainer.appendChild (gameCard);
 

    }
  

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage([...GAMES_JSON].sort ((a, b) => b.pledged - a.pledged));


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `
    <p>${totalContributions.toLocaleString()}</p>
    <p>Contributions</p>
`;
// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalMoneyRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);
// set inner HTML using template literal
raisedCard.innerHTML = `
    <p>$${totalMoneyRaised.toLocaleString()}</p>
    <p>Amount Raised</p>
`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
// grab the number of games card and use reduce() to count the number of games
const totalGames = GAMES_JSON.reduce((acc, game) => acc + 1, 0);
// set the inner HTML using template literal
gamesCard.innerHTML = `
    <p>${totalGames.toLocaleString()}</p>
    <p>Games</p>
`;  


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    console.log ('unfunded games = ',unfundedGames); 
  
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage (unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    console.log ('funded games = ',fundedGames);

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage (fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
    console.log ('all games = ',GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
unfundedBtn.addEventListener("click", filterUnfundedOnly);

const fundedBtn = document.getElementById("funded-btn");
fundedBtn.addEventListener("click", filterFundedOnly);

const allBtn = document.getElementById("all-btn");
allBtn.addEventListener("click", showAllGames);


// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
const numUnfundedGames = unfundedGames.length;


// create a string that explains the number of unfunded games using the ternary operator
const unfundedString = `There are ${numUnfundedGames} unfunded games.`;
// create a string that explains the number of funded games using the ternary operator
const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
const numFundedGames = fundedGames.length;
const totalPledged = fundedGames.reduce((acc, game) => acc + game.pledged, 0);
const remainingText = numUnfundedGames === 1 ? "1 game remains" : `${numUnfundedGames} games remain`;
const displayStr = `A total of <span style="color: #CB0404"> $${totalPledged.toLocaleString()} </span> has been raised for ${numFundedGames} games. Currently, ${remainingText} unfunded. We need your help to fund these amazing games!`;
console.log(displayStr);
const descriptionParagraph = document.createElement("p");
descriptionParagraph.innerHTML = displayStr;
descriptionContainer.appendChild(descriptionParagraph);

// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  [...GAMES_JSON].sort( (item1, item2) => item2.pledged - item1.pledged);


// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...others] = sortedGames;

console.log("Top Game:", firstGame.name);
console.log("Runner-up:", secondGame.name);

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameName = document.createElement("p");
firstGameName.textContent = firstGame.name;
firstGameContainer.appendChild(firstGameName);

// do the same for the runner up item
const secondGameName = document.createElement("p");
secondGameName.textContent = secondGame.name;
secondGameContainer.appendChild(secondGameName);

const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", (event) => {
  const searchTerm = event.target.value.toLowerCase();

  const filteredGames = GAMES_JSON.filter(game =>
    game.name.toLowerCase().includes(searchTerm)
  );

  deleteChildElements(gamesContainer);
  addGamesToPage(filteredGames);
});