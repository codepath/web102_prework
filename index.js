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
                                <h3 class="game-title">${games[i]["name"]}</h3>
                                <p class="game-about">${games[i]["description"]}</p>
                                <p class="backers">${games[i]["backers"]} backers</p>`;
        
        // Unfunded alert!
        let need =(games[i]["goal"] -games[i]["pledged"]);
        if(need > 0){
            let unfundedAlert = document.createElement("p");
            unfundedAlert.innerHTML = `Unfunded! We need $${need.toLocaleString('en-US')} to reach our goal.`;
            unfundedAlert.classList = "unfunded-alert";
            gameDiv.appendChild(unfundedAlert);
        }

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

// adding .selected class to button at loading
allBtn.classList.add("selected")


// add event listeners with the correct functions to each button


// Demonstrating Event Bubbling

// Event bubbling is a concept related to the DOM. Basically, whenever an event is triggered for an element (e.g a button)
// ==> any event handlers attached to parent elements (all the way to the html roote element) will be 
// triggered as well (e.g parent div, body, etc) -->this is a default feature and can be changed in the event listener parameters

const buttonContainer = document.getElementById("button-container");
buttonContainer.addEventListener("click", () => {
    console.log("The event listener for the button container has been executed. Demonstrating Event Bubbling.")
});

// adding style modications to buttons

unfundedBtn.addEventListener("click", () => {
    
    // removing the selected class from the other two buttons
    fundedBtn.classList.remove("selected"); // selected changes the css of the current button
    allBtn.classList.remove("selected");

    // adding selected class to the current button (would the "this" keyword have worked?)
    unfundedBtn.classList.add("selected");
    filterUnfundedOnly();
});

fundedBtn.addEventListener("click", () => {
    
    unfundedBtn.classList.remove("selected");
    allBtn.classList.remove("selected");

    fundedBtn.classList.add("selected");
    filterFundedOnly();
});

allBtn.addEventListener("click", () => {

    unfundedBtn.classList.remove("selected");
    fundedBtn.classList.remove("selected");

    allBtn.classList.add("selected"); // classList already contains this class at the beginning, so this is ignored once
    showAllGames();
});



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

// using reduce to find total funds
let totalFunds = GAMES_JSON.reduce( (accumulator, game) => {
    return accumulator + game["pledged"]; 
}, 0).toLocaleString('en-US');

console.log(numUnfundedGames) // double check

// create a string that explains the number of unfunded games using the ternary operator
let descriptionStr = `We have raised a total of $${totalFunds} in funds for ${GAMES_JSON.length} games. `

if (numUnfundedGames > 0){
    descriptionStr += (numUnfundedGames == 1) ? `<span>Currently, just ${numUnfundedGames} game remains unfunded.</span> 
    Donate and help us fund all of these amazing games!` : `<span>Currently, ${numUnfundedGames} games remain unfunded.</span>
    Donate and help us fund all of these amazing games!`;
}

console.log(descriptionStr) // double check

// create a new DOM element containing the template string and append it to the description container
let descriptionParagraph = document.createElement("p");
descriptionParagraph.classList.add("description");
descriptionParagraph.innerHTML = descriptionStr;

console.log(descriptionParagraph) // double check


// append to description container
descriptionContainer.appendChild(descriptionParagraph)


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

// Spread Operator: quick way of making copies of an entire array  or parts of it
// It seems that a spread operator can't be used as a placeholder anywhere before the last item on the list
// i.e, I can't grab all the elements up to the last two and then grab the other two in a different variable
// ==> "rest element must be last in destructuring" error
/*
    * let [...allOtherGames, lastGame] = GAMES_JSON; // allOtherGames should copy all of the games in GAMES_JSON except the last one
    * console.log(allOtherGames);
    * console.log(lastGame); // lastGame should capture final element
*/
let array1 = [1, 3, 5, 7, 11, 13]
let array2 = [...array1, 17, 19, 23] // this makes a copy of the array, while .push() just edits an existing array
console.log(array2)

// Destructuring: a way of unpacking objects or arrays to grab information and put into individual variables
/*
    * function getEmployees() {
    *   return ["Sandra", "Ola", "Chi"];
    * }
    * let [a, b, c] = getEmployees(); // ==> a == "Sandra", b == "Ola", c == "Chi"
*/


// Note: I noticed that once this .sort() function is executed, the filter functions seem to rearrange the order of the original 
// GAMES_JSON array ==> I deduced that this sort() function must not be making a copy of the array and is instead modifying the original
// ==> using the spread operator "...", a quick copy of te GAMES_JSON array can be made and then sorted so that 
// other parts of the site aren't affected

const sortedGames =  [... GAMES_JSON].sort( (item1, item2) => {
    return item2.pledged - item1.pledged; // sorting in order of most pledges to least pledges (funds)
});
console.log(sortedGames); // view in console

// combining destructuring and spread operator ==> destructuring only works when there is a variable available for every item in the list
let [topGame, runnerUpGame, ...remainingGames] = sortedGames;

// create a new element to hold the name of the top 2 pledged games, then append it to the correct element

// using DOM to create elements ==> necessary when there are already elements in the container being modified
let topGameElement = document.createElement("h4");
topGameElement.innerHTML = `${topGame["name"]} <span> ($${topGame["pledged"]})</span>`;
let topGameImage = document.createElement("img");
topGameImage.src = topGame["img"];
firstGameContainer.append(topGameImage, topGameElement);

let runnerUpGameElement = document.createElement("h4");
runnerUpGameElement.innerHTML = `${runnerUpGame["name"]} <span> ($${runnerUpGame["pledged"]})</span>`;
let runnerUpGameImg = document.createElement("img");
runnerUpGameImg.src = runnerUpGame["img"];
secondGameContainer.append(runnerUpGameImg, runnerUpGameElement);


/************************************************************************************
 * EXTRA: Adding search function to filtering (custom keyword search)
 * ==> In this feature, a user can type in words like "board game" or "hero" and any game object name 
 * or description containing that word or string will be displayed
 */

// accessing switch elements ==> giving user the option to switch between the original filter to search filter
let searchSwitch = document.getElementById("search");
let fundsSwitch = document.getElementById("funds");

// accessing containers
let btnContainer = document.getElementById("button-container");
let searchContainer = document.getElementById("search-container");

let searchInput = document.getElementById("search-input");

searchContainer.style.display = "none"; // when the page loads, the search feature is hidden

// switching between search feature and original filter feature
searchSwitch.addEventListener("click", () => {
    btnContainer.style.display = "none";
    searchContainer.style.display = "flex"; // the search container uses flexbox
});

fundsSwitch.addEventListener("click", () => {
    searchContainer.style.display = "none";
    btnContainer.style.display = "";
});

function filterBySearch(searchInputVal){
    console.log(searchInputVal) // double check that the text in the inputfield is being accessed as changed

    searchInputVal = searchInputVal.toLowerCase();

    let searchedGames = GAMES_JSON.filter((game, index) => {
        // console.log(`index ${index}, game "${game.name}"`)

        // a game will be displayed if it's name or description contains the text input into the inputfield
        let matchesSearch = (game["name"].toLowerCase()).includes(searchInputVal) || 
                                (game["description"].toLowerCase()).includes(searchInputVal);
                                // toLowerCase() is important to accept all input format

        // displaying evaluation of expression 
        //console.log(`game: ${game.name}: includes ${searchInputVal}? ${matchesSearch}`);

        return matchesSearch;
    });

    deleteChildElements(gamesContainer);

    // adding a message if there are no results for better UI
    if(searchedGames.length == 0){
        let searchPlaceholder = document.createElement("div");
        searchPlaceholder.classList.add("search-message");
        searchPlaceholder.innerHTML = "<p>Sorry! No games match your search.</p>"
        gamesContainer.appendChild(searchPlaceholder);
    }

    addGamesToPage(searchedGames)
}


searchInput.addEventListener("input", (event) => {
    // console.log(event) // ==> object that provides data on the event that just occured
    // ==> in this case, text typed into an input field

    let searchInputVal = searchInput.value;
    filterBySearch(searchInputVal)
});
