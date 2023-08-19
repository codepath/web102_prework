/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)
console.log(GAMES_JSON)

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

// DOM - Document Object Model ==> essentially an outline of html components that can be acquired and changed with JS
// ==> DOM categorizes elements in the HTML document as objects, with their own attributes and content ==> now JS can be used
// to add, change, delete, recieve or output values from HTML elements (texts, inputs, buttons, etc)

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// Template literals
// can run functions, expressions, or access values within a string (the string can also contain the syntax of html elements)


// Multiple types of functions: arrow or traditional (arrow functions are more concise versions of traditional functions)
// Arrow functions are distinct in multiple ways 
// ==> "this" keyword within traditional functions can refer to the outermost global object, the object that owns the invoked method
// or the instance of a function (cunstructor invocation)
// "this" in arrow functions will always refer to the outermost global object ==> no binding
// ==> no instances can be made from arrow functions aka they cannot be constructor functions

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    
    for (let i = 0; i < games.length; i++){
        console.log(`Adding "${games[i]["name"]}"`);
        
        // create a new div element, which will become the game card
        // add the class game-card to the list
        let gameDiv = document.createElement("div");
        gameDiv.classList.add("game-card");
        gameDiv.innerHTML = ` <img class="game-img" src = "${games[i]["img"]}" /> 
                                <h2 class="game-title">${games[i]["name"]}</h2>
                                <p class="game-about">${games[i]["description"]}</p>`;

        // append gameDiv HTML element to the external container in the document
        gamesContainer.appendChild(gameDiv)
    }


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        // append the game to the games-container

}

// call the function we just defined using the correct variable

addGamesToPage(GAMES_JSON)



/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// Callback function are functions that can be used as arguments for other functions
// ==> these are more efficient and allow for flexibility in running multiple functions in a certain order

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
// ==> reduce() is an accumulator function that collapses a list of values into one number, it takes a callback function argument
// (to indicate what expressions to perform with the values?), and an initial value (e.g 0)
// the callback function should have the parameters of an accumulator (previousValue), and current value or element
// ==> can also include entire list and index of each item

/* Example w/ Spotify Wrapped
    * const totalListens = songs.reduce( (acc, song) => { // reduce is a method for arrays/lists
    *   return acc + song.listens;
    * }, 0);
*/
// callback function takes the argument of the changine value of the accumulator (as the program "iterates" through each item)
// variable and the list itself (songs in this case)

// set the inner HTML using a template literal and toLocaleString to get a number with commas

function addTotalContributors(){
    let totalContributors = GAMES_JSON.reduce( (accumulator, game, indexValue) => { // game is the item in the list

        // demonstrating the iteration through the list in console
        let result = accumulator + game["backers"];
        console.log(`At index ${indexValue}, the accumulated number is ${result}`);

        return result; // becomes the new value for accumulator
    }, 0);
    
    totalContributors = totalContributors.toLocaleString('en-US'); // formatting numbers to include commas depending on country
    contributionsCard.innerHTML = `<p>${totalContributors}</p>`;
}
addTotalContributors();


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

function addTotalFunds(){
    let totalFunds = GAMES_JSON.reduce( (accumulator, game) => {
        return accumulator + game["pledged"]; // becomes the new value for accumulator
    }, 0);
    
    totalFunds = totalFunds.toLocaleString('en-US'); // formatting numbers to include commas depending on country
    raisedCard.innerHTML = `<p>$${totalFunds}</p>`;
}
addTotalFunds();

// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

function addTotalGames(){
   
    gamesCard.innerHTML = `<p>${GAMES_JSON.length}</p>`;

}
addTotalGames();




/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// Array filter: designed to return a filtered list from an original list, based on a conditional
// ==> the filter() function only has one parameter, a callback function holding the contitional
// this is then evaluated for each item in the list ==> if true, included in the returned filtered list
// NOTE: filter() does not change the original array, rather creates a new one with the original array's filtered items

// similar to other iterative methods belonging to Arrays, the callback function for filter() is formatted as such:
/*
    * function callback(currentElement, index, array){
    * // ...
    * }
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal

    let unfundedGamesList = GAMES_JSON.filter( (game, index) => {

        // demonstrating how the iteration works in console 
        let isUnfunded = game["pledged"] < game["goal"];
        console.log(`For item ${index}: ${game["pledged"]} < ${game["goal"]} is ${isUnfunded}`);

        return isUnfunded; // if the game's current funds are less than the the goal funds
    });

    console.log(unfundedGamesList);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGamesList);

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal

    let fundedGamesList = GAMES_JSON.filter((game) => {
        return game["pledged"] >= game["goal"];
    });

    // use the function we previously created to add unfunded games to the DOM

    addGamesToPage(fundedGamesList);
}

// show all games
function showAllGames() {

    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM

    // testing the changed order of objects in the original array 
    // ==> I believe the unpreserved order has to do with the other challenges' pre-code
    for(let i = 0; i < GAMES_JSON.length; i++){
        console.log(GAMES_JSON[i])
    }

    // unfiltered original list
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");


// add event listeners with the correct functions to each button


// Demonstrating Event Bubbling

// Event bubbling is a concept related to the DOM. Basically, whenever an event is triggered for an element (e.g a button)
// ==> any event handlers attached to parent elements (all the way to the html roote element) will be 
// triggered as well (e.g parent div, body, etc) -->this is a default feature and can be changed in the event listener parameters

const buttonContainer = document.getElementById("button-container")
buttonContainer.addEventListener("click", () => {
    console.log("The event listener for the button container has been executed. Demonstrating Event Bubbling.")
});

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames)



/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// Ternary Operator: these are essentially a consolidation of if else statements --> used a lot in React framework
// ==> the format is as follows: conditional ? *executed code if true* : *executed code if false*
// eg) (studentAnswer == 45.35 || studentAnswer == 45. 348) ? console.log("Correct") : console.log("Incorrect")

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games

let numUnfundedGames = GAMES_JSON.reduce((accumulator, game) => {
    // using ternary operator to return the new value for the accumulator
    // if the game is unfunded, add 1, if it's not, add nothing
    return (game["pledged"] < game["goal"]) ? accumulator + 1 : accumulator;
}, 0);

let totalFunds = addTotalFunds();

console.log(numUnfundedGames) // double check

// create a string that explains the number of unfunded games using the ternary operator
let descriptionStr = `We have raised a total of $${totalFunds} in funds for ${GAMES_JSON.length}.`

if (numUnfundedGames > 0){
    descriptionStr += (numUnfundedGames == 1) ? `Currently, just ${numUnfundedGames} game remains unfunded. Donate and help
     us fund all of these amazing games!` : `Currently, ${numUnfundedGames} game remain unfunded. Donate and help
     us fund all of these amazing games!`;
}

console.log(descriptionStr)



// create a new DOM element containing the template string and append it to the description container

// /************************************************************************************
//  * Challenge 7: Select & display the top 2 games
//  * Skills used: spread operator, destructuring, template literals, sort 
//  */

// const firstGameContainer = document.getElementById("first-game");
// const secondGameContainer = document.getElementById("second-game");

// const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
//     return item2.pledged - item1.pledged;
// });

// // use destructuring and the spread operator to grab the first and second games

// // create a new element to hold the name of the top pledge game, then append it to the correct element

// // do the same for the runner up item