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
    games.forEach(({ name, img, description, backers, goal, pledged }) => {
        console.log(`Adding "${name}"`);

        const gameDiv = document.createElement("div");
        gameDiv.classList.add("game-card");
        gameDiv.innerHTML = `
            <img class="game-img" src="${img}" />
            <h3 class="game-title">${name}</h3>
            <p class="game-about">${description}</p>
            <p class="backers">${backers} backers</p>
        `;

        // Calculate the amount needed to reach the goal
        const need = goal - pledged;
        if (need > 0) {
            const unfundedAlert = document.createElement("p");
            unfundedAlert.innerHTML = `Unfunded! We need $${need.toLocaleString('en-US')} to reach our goal.`;
            unfundedAlert.classList.add("unfunded-alert");
            gameDiv.appendChild(unfundedAlert);
        }

        // Append the gameDiv to the container
        gamesContainer.appendChild(gameDiv);
    });
}


// call the function we just defined using the correct variable

addGamesToPage(GAMES_JSON)


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");


// set the inner HTML using a template literal and toLocaleString to get a number with commas

function addTotalContributors() {
    const totalContributors = GAMES_JSON.reduce((accumulator, { backers }, index) => {
        const newTotal = accumulator + backers;
        console.log(`At index ${index}, the accumulated number is ${newTotal}`);
        return newTotal;
    }, 0).toLocaleString('en-US'); // Directly format the result
    
    contributionsCard.innerHTML = `<p>${totalContributors}</p>`;
}

addTotalContributors();


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

function addTotalFunds() {
    const totalFunds = GAMES_JSON.reduce((accumulator, { pledged }) => accumulator + pledged, 0)
        .toLocaleString('en-US'); // Directly format the result
    
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

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer); // Assuming this function clears the gamesContainer

    const unfundedGamesList = GAMES_JSON.filter(({ pledged, goal }, index) => {
        const isUnfunded = pledged < goal;
        // Optional: Log only if needed for debugging
        // console.log(`For item ${index}: ${pledged} < ${goal} is ${isUnfunded}`);
        return isUnfunded;
    });

    // Optionally log the list of unfunded games if necessary
    // console.log(unfundedGamesList);

    addGamesToPage(unfundedGamesList); // Reuse existing function to display unfunded games
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer); // Clears the gamesContainer

    const fundedGamesList = GAMES_JSON.filter(({ pledged, goal }) => pledged >= goal);

    addGamesToPage(fundedGamesList); // Adds the funded games to the DOM
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer); // Clears the gamesContainer

    // Optionally log each game object if needed for debugging
    // GAMES_JSON.forEach(game => console.log(game));

    addGamesToPage(GAMES_JSON); // Adds all games to the DOM
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// adding .selected class to button at loading
allBtn.classList.add("selected")


// add event listeners with the correct functions to each button

// add event listener for the button container  element being clicked

const buttonContainer = document.getElementById("button-container");
buttonContainer.addEventListener("click", () => {
    console.log("The event listener for the button container has been executed. Demonstrating Event Bubbling.")
});

// adding style modications to buttons

// Assuming there's a function to remove the 'selected' class from all buttons
function deselectAllButtons() {
    // This assumes fundedBtn, allBtn, and unfundedBtn are part of a broader selection of buttons
    [fundedBtn, allBtn, unfundedBtn].forEach(btn => btn.classList.remove("selected"));
}

unfundedBtn.addEventListener("click", () => {
    deselectAllButtons(); // Clear 'selected' from all buttons
    unfundedBtn.classList.add("selected"); // Mark this button as selected
    filterUnfundedOnly(); // Apply the filter
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

// grab the title container


// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games

let numUnfundedGames = GAMES_JSON.reduce((accumulator, game) => {
    // using ternary operator to return the new value for the accumulator
    // if the game is unfunded, add 1, if it's not, add nothing
    return (game["pledged"] < game["goal"]) ? accumulator + 1 : accumulator;
}, 0);

// using template literals to create a string that explains the number of unfunded games
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

// spread operator and destructuring functions are used to select the games that are selected by the user and destructuring

let array1 = [1, 3, 5, 7, 11, 13]
let array2 = [...array1, 17, 19, 23] // this makes a copy of the array, while .push() just edits an existing array
console.log(array2)


// Observation: Executing the .sort() function appears to alter the sequence of the GAMES_JSON array, 
// suggesting that the sort operation modifies the array directly rather than creating a duplicate. 
// To circumvent this and preserve the original array's order for other site functionalities, 
// employing the spread operator "..." to clone the GAMES_JSON array before sorting is a practical solution.

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


/**********************************************************************************
 * Enhancement: Incorporating a search capability into the filtering process
 * This functionality allows users to input terms such as "board game" or "hero", 
 * and any game objects with names or descriptions that include those terms will be shown.
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
function resetButtonSelection() {
    unfundedBtn.classList.remove("selected");
    fundedBtn.classList.remove("selected");
    allBtn.classList.add("selected"); // Assuming allBtn is the default state
}

function toggleUIContainers() {
    btnContainer.style.display = "none"; // Hide button container
    searchContainer.style.display = "flex"; // Show search container
}

searchSwitch.addEventListener("click", () => {
    deleteChildElements(gamesContainer); // Reset displayed games
    addGamesToPage(GAMES_JSON); // Add all games back
    searchInput.value = ""; // Clear the search bar

    resetButtonSelection(); // Restore button selection to default
    toggleUIContainers(); // Adjust UI container visibility
});


function resetSearchAndButtonStates() {
    searchInput.value = ""; // Clear the search bar
    // Reset button selection states
    unfundedBtn.classList.remove("selected");
    fundedBtn.classList.remove("selected");
    allBtn.classList.add("selected");
}

function switchUIVisibility() {
    searchContainer.style.display = "none"; // Hide the search container
    btnContainer.style.display = ""; // Show the button container by resetting its display property
}

fundsSwitch.addEventListener("click", () => {
    deleteChildElements(gamesContainer); // Clear the game display
    addGamesToPage(GAMES_JSON); // Reload all games
    resetSearchAndButtonStates(); // Clear search input and reset button states
    switchUIVisibility(); // Adjust UI components visibility
});


function filterBySearch(searchInputVal) {
    // Convert the search input to lowercase once, for efficiency
    const searchTerm = searchInputVal.toLowerCase();

    // Filter GAMES_JSON for games matching the search term in their name or description
    const searchedGames = GAMES_JSON.filter(({ name, description }) => 
        name.toLowerCase().includes(searchTerm) || 
        description.toLowerCase().includes(searchTerm)
    );

    // Clear previous games from the display
    deleteChildElements(gamesContainer);

    // If no games match the search, display a message; otherwise, add the games to the page
    if (searchedGames.length === 0) {
        const searchPlaceholder = document.createElement("div");
        searchPlaceholder.classList.add("search-message");
        searchPlaceholder.innerHTML = "<p>Sorry! No games match your search.</p>";
        gamesContainer.appendChild(searchPlaceholder);
    } else {
        addGamesToPage(searchedGames);
    }
}



searchInput.addEventListener("input", () => {
    filterBySearch(searchInput.value);
});