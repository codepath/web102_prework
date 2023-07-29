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
    for (let i = 0; i < games.length; i++){
        
        const game = games[i]; // i made this so that each game from JSON is called instead of retyping in the innerHTML part

        // create a new div element, which will become the game card
        const div = document.createElement("div");
        // add the class game-card to the list
        div.classList.add("game-card");
        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        
        div.innerHTML = 
            `<p>Name: ${game.name}</p>
            <p>Description: ${game.description}</p>
            <img src = "${game.img}" alt = "image of the game" class = "game-img" />`
        ;

        // append the game to the games-container
        gamesContainer.appendChild(div);

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
// reduce ( function, starting_point)
// function is an anonymous arrow function which takes in 2 parameters, (sum_variable, array(i)) that sums the backers of each game
// (accumulator, current) => {ret accumulator + current.property}
// this function is saying: go thr each game, the starting sum is 0. ret sum + the backer of game 0, game 1, game 2 each iteration
const totalContributions = GAMES_JSON.reduce( (sum, games) => {return sum + games.backers}, 0); 

// set the inner HTML using a template literal and toLocaleString to get a number with commas
const formatContributions = totalContributions.toLocaleString(); // Format the number with commas
contributionsCard.innerHTML = `${formatContributions}`;


// grab the amount raised card, then use reduce() to find the total amount raised
// same thing as backers, but for $$ pledged, code copy and pasted
const raisedCard = document.getElementById("total-raised");
const totalMoney = GAMES_JSON.reduce( (sum, games) => {return sum + games.pledged}, 0);
const formatMoney = totalMoney.toLocaleString(); // Format the number with commas
// set inner HTML using template literal
raisedCard.innerHTML = `$${formatMoney}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.length;
const formatGames = totalGames.toLocaleString(); // Format the number with commas
// set inner HTML using template literal
gamesCard.innerHTML = `${formatGames}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    // unfundedGames is a list of games where fund < goal
    let unfundedGames = GAMES_JSON.filter( (game) => {return game.pledged < game.goal});

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);

}


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let fundedGames = GAMES_JSON.filter( (game) => {return game.pledged > game.goal});

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
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
// const totalGamesUnfunded = GAMES_JSON.reduce( (sum, games) => {return sum + (games.pledged < games.goal)}, 0 );

// ________________________________________
// me doing another method instead of ternary operator
// me counting the total $ of the unfunded games
// using filter to make list of unfunded GAMES JSON objects
// counting total # games
// counting total $ unfunded added together
    const listUnfunded = GAMES_JSON.filter( (game) => {return game.pledged < game.goal}); // game A, B, C
    const totalGamesUnfunded = listUnfunded.length; // --> 7
// ___________________________________________

// create a string that explains the number of unfunded games using the ternary operator
// (cond , if true --> string, else false --> this string)

// if > 1 unfunded
const displayUFPlural = `A total of $${formatMoney} has been raised for ${totalGames} games. Currently, ${totalGamesUnfunded} games remain unfunded. We need your help to fund these amazing games!`
// if 1 unfunded
const displayUFSingular = `A total of $${formatMoney} has been raised for ${totalGames} games. Currently, ${totalGamesUnfunded} game remains unfunded. We need your help to fund these amazing games!`
const displayStr = (totalGamesUnfunded == 1) ? displayUFSingular : displayUFPlural;

// create a new DOM element containing the template string and append it to the description container
const paragraph = document.createElement("div");
paragraph.innerHTML = displayStr;
descriptionContainer.appendChild(paragraph);

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
let [firstGame, secondGame, ...remainingGames] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topPledgeName = document.createElement("div");
topPledgeName.innerHTML = firstGame.name;
firstGameContainer.appendChild(topPledgeName);

// do the same for the runner up item
const nextPledgeName = document.createElement("div");
nextPledgeName.innerHTML = secondGame.name;
secondGameContainer.appendChild(nextPledgeName);