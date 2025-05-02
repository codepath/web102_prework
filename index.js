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
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for(let i = 0; i < games.length; i++){
        // Outputting what info are inside the GAMES.JSON file.
        // console.log(games[i]);

        // STEP 2: create a new div element, which will become the game card
        const game_div = document.createElement("div");
        // NOTE: adding the game-card class to the game_div will give all the elements in this div
        // the properties of the game-card class in the CSS file
        game_div.classList.add("game-card");

        // STEP 3: set the inner HTML using a template literal to display some info about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        let gameContent = 'Game Name: ' + games[i].name + '<br>' +
                    '<img src="' + games[i].img + '" class="game-img" alt="Game Image" />' + '<br>' +
                    'Description: ' + games[i].description + '<br>' +
                    'Pledged: $' + games[i].pledged.toLocaleString() + '<br>' +
                    'Goal: $' + games[i].goal.toLocaleString() + '<br>' +
                    'Backers: ' + games[i].backers.toLocaleString() + '<br>';

        // set the game content to the game_div that we just created
        game_div.innerHTML = gameContent;

        // append the gameinfo to the games-container div in the html
        gamesContainer.appendChild(game_div);

        // make sure call this function at the bottom of the javascript file
        // so that it runs after the page loads
    }
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
    const total_contributions = GAMES_JSON.reduce((sum, GAMES_JSON) => sum + GAMES_JSON.backers, 0 )
    console.log("Logging the total number of backers :" + total_contributions);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
    contributionsCard.innerHTML = '$' + total_contributions.toLocaleString();

// grab the amount raised card, then use reduce() to find the total amount raised
    const raisedCard = document.getElementById("total-raised");
    const raisedAmount = GAMES_JSON.reduce((sum, GAMES_JSON) => sum+ GAMES_JSON.pledged ,0);
    console.log("The total amount raised is " + raisedAmount);

// set inner HTML using template literal
    raisedCard.innerHTML = '$' +raisedAmount.toLocaleString();

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
// const numOfGames = GAMES_JSON.reduce((sum, GAMES_JSON)=> sum + GAMES_JSON.length,0);
// console.log("Number of Games is " + numOfGames);
console.log("Number of Games is " + GAMES_JSON.length);
gamesCard.innerHTML = GAMES_JSON.length;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let listOfUnfundedGames = GAMES_JSON.filter( (game) => {
        return game.pledged < game.goal;
    });
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(listOfUnfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let listOfFundedGames = GAMES_JSON.filter( (game) => {
        return game.pledged >= game.goal;
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(listOfFundedGames);
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

const currentDate = new Date;
const startDate = new Date("January 1, 2013");



// use filter or reduce to count the number of unfunded games
const numOfUnfundedGames = GAMES_JSON.filter((game)=>{
    return game.pledged < game.goal;
}).length;

const numYearsOperating = `The purpose of our company is to fund independent games. We've been in operation for ${currentDate.getFullYear() - startDate.getFullYear()} years. <br>`;
const description = `A total of ` + raisedAmount.toLocaleString() + ` has been raised for ` + numOfUnfundedGames.toLocaleString() + ` games. `;

// create a string that explains the number of unfunded games using the ternary operator
const unfundedGamesString = `The total number of unfunded Games is ${ 
    numOfUnfundedGames > 0 ? numOfUnfundedGames.toLocaleString() : " No unfunded Games :)"
}` + ` . We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
descriptionContainer.innerHTML = numYearsOperating + description +  unfundedGamesString;

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
const [firstFundedGame, secondFundedGame, ...remainingGames] = sortedGames; 

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstFundedGameName = firstFundedGame.name;
firstGameContainer.innerHTML += firstFundedGameName;

// do the same for the runner up item
const secondFundedGameName = secondFundedGame.name;
secondGameContainer.innerHTML += secondFundedGameName;