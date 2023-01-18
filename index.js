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


        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container
    for(let i = 0; i < games.length; i++){
        gamesContainer.innerHTML += `<div class = "game-card">
            <h1> ${games[i].name} </h1>
            <p>${games[i].description}</p>
            <p> Backers: ${games[i].backers}</p>
            <img class = "game-img"
             src = ${games[i].img} />
        </div>`
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
contributionsCard.innerHTML = GAMES_JSON.reduce((total, value) => total + value.backers, 0).toLocaleString();
// use reduce() to count the number of total contributions by summing the backers


// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
raisedCard.innerHTML ="$"+ GAMES_JSON.reduce((total, value) => total + value.pledged, 0).toLocaleString();
// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = GAMES_JSON.length.toLocaleString();

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const result = GAMES_JSON.filter(GAMES_JSON => (GAMES_JSON.pledged < GAMES_JSON.goal));
    addGamesToPage(result);
    console.log(result);
    // use filter() to get a list of games that have not yet met their goal


    // use the function we previously created to add the unfunded games to the DOM

}
filterUnfundedOnly();

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const result = GAMES_JSON.filter(GAMES_JSON => (GAMES_JSON.pledged > GAMES_JSON.goal));
    addGamesToPage(result);
    console.log(result);
    // use filter() to get a list of games that have met or exceeded their goal


    // use the function we previously created to add unfunded games to the DOM

}
filterFundedOnly();
// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
    // add all games from the JSON data to the DOM

}
showAllGames();

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

let numUnfunded = GAMES_JSON.filter(GAMES_JSON => (GAMES_JSON.pledged < GAMES_JSON.goal)).length;
console.log(numUnfunded);

// create a string that explains the number of unfunded games using the ternary operator
let total = "$" + GAMES_JSON.reduce((total, value) => total + value.pledged, 0).toLocaleString()
let checker = (numUnfunded > 1) ? numUnfunded : '1';
let displayStr = `A total of ${total} has been raised for ${GAMES_JSON.length.toLocaleString()} games. Currently, ${checker} game remains unfunded. We need your help to fund these amazing games!`;
console.log(displayStr);
// create a new DOM element containing the template string and append it to the description container

const para = document.createElement("p");
const node = document.createTextNode(displayStr);
para.appendChild(node);

descriptionContainer.appendChild(para);

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

const nameTop = sortedGames[0].name;
const nameSec = sortedGames[1].name;
const nameCombined = [nameTop, nameSec];
console.log(nameCombined);

// create a new element to hold the name of the top pledge game, then append it to the correct element

const para1 = document.createElement("p");
const node1 = document.createTextNode(nameCombined[0]);
para1.appendChild(node1);

firstGameContainer.appendChild(para1);

// do the same for the runner up item

const para2 = document.createElement("p");
const node2 = document.createTextNode(nameCombined[1]);
para2.appendChild(node2);

secondGameContainer.appendChild(para2);