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
    //forEach goes over each value in the list of ojbects games
    // game = one value in games
    games.forEach(game => {
        // create a new div element, which will become the game card
        // document.createElement - creates a new element in the document
        const gameCard = document.createElement('div');
        // add the class game-card to the list
        gameCard.classList.add('game-card');
        // set the inner HTML using a template literal to display some info 
        // about each game
        //call upon each key in the game value (game.key) to get their value
        //back ticks so it reads the ${}
        gameCard.innerHTML = `
            <img src= ${game.img} alt="Game Image" class = "game-img">
            <div>
                <h4><b>Name: ${game.name}</b></h4>
                <p>Description: ${game.description}</p>
                <p>Pledged: ${game.pledged}</p>
                <p>Goal: ${game.goal}</p>
                <p>Backers: ${game.backers}</p>
            </div>
        `;
        // append the game to the games-container
        //this element is grabbed outside the function
        gamesContainer.appendChild(gameCard)

    })
    // TIP: if your images are not displaying, make sure there is space
    // between the end of the src attribute and the end of the tag ("/>")
}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON)
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
//call reduce on GAMES_JSON object
//acc = accumulator (fancy word for the total added)
//game = the object from GAMES_JSON (one at a time ladies)
//using dot notation to get the backers for each game and add them all
const contributions = GAMES_JSON.reduce((acc, game) => {
    return acc + game.backers;
}, 0)
//check you get an accurate number, should be:19187 (counted them myself)
console.log(contributions)

// set the inner HTML using a template literal and toLocaleString to get a number with commas
const contribFormatted = contributions.toLocaleString('en-US')
contributionsCard.innerHTML = `${contribFormatted}`

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const raised = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged;
}, 0)
console.log(raised)
// set inner HTML using template literal
const raisedFormatted = raised.toLocaleString('en-US')
raisedCard.innerHTML = `$${raisedFormatted}`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const games = GAMES_JSON.reduce((acc, game) => {
    return acc + 1
}, 0)
console.log(games)

const gamesFormatted = games.toLocaleString('en-US')
gamesCard.innerHTML = `${gamesFormatted}`



/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const underFunded = GAMES_JSON.filter((game) => game.pledged < game.goal)
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(underFunded)
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const funded = GAMES_JSON.filter((game) => game.pledged >= game.goal)

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(funded)
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON)

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly)
fundedBtn.addEventListener("click", filterFundedOnly)
allBtn.addEventListener("click", showAllGames)


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numUnderFunded = GAMES_JSON.filter((game) => game.pledged < game.goal).length
console.log(numUnderFunded)
// create a string that explains the number of unfunded games using the ternary operator
const message = `A total of $${raisedFormatted} has been raised for ${gamesFormatted} games. Currently, 
${numUnderFunded != 0 ? 
    numUnderFunded + " games remain unfunded. We need your help to fund these amazing games!" 
    : " all games are funded!"}`

// create a new DOM element containing the template string and append it to the description container
const gameMsg = document.createElement('p')
gameMsg.innerHTML = message
descriptionContainer.appendChild(gameMsg)
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
let [game1, game2] = sortedGames
console.log([game1, game2])
// create a new element to hold the name of the top pledge game, then append it to the correct element
const mostFunded = game1.name
console.log(mostFunded)
const mFGame = document.createElement('p')
mFGame.innerHTML = mostFunded
firstGameContainer.appendChild(mFGame)
// do the same for the runner up item
const mostFunded2 = game2.name
console.log(mostFunded2)
const mFGame2 = document.createElement('p')
mFGame2.innerHTML = mostFunded2
secondGameContainer.appendChild(mFGame2)

/************************************************************************************
 * Bonus: Add ons & UX/UI modified
 */
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");

function scrollToGamesSection() {
    const gamesSection = document.getElementById('games');
    gamesSection.scrollIntoView({ behavior: 'smooth' });
}

function getMatchingGames(searchInput){
    const gameCards = document.querySelectorAll('.game-card');
    let matched = false;

    gameCards.forEach(game => {
        const gameNameEl = game.querySelector('h4');

        if(gameNameEl){
            const gameName = gameNameEl.textContent.toLowerCase();

            if (gameName.includes(searchInput.toLowerCase())){
                matched = true;
                game.classList.add('search-highlight');

                setTimeout(()=>{
                    game.classList.add('fade-out');
                    setTimeout(()=>{
                        game.classList.remove('search-highlight', 'fade-out');
                    }, 300)
                }, 3000)
            }
        }

    });
    return matched;
}

function noResults(searchVal){
    alert(`We are sorry, we could not find "${searchVal}" among our game library. Make sure to be in the all games filter when searching.`)
}

function executeSearch(){
    const searchVal = searchInput.value.trim();

    if(!searchVal){
        alert('Nothing has been search for.');
        return;
    }

    let foundInGames = false;
    GAMES_JSON.forEach(game => {
        if(game.name.toLowerCase().includes(searchVal.toLowerCase())){
            foundInGames = true;
        }
    });

    if (foundInGames){
        scrollToGamesSection();
        setTimeout(()=> {
            const matched = getMatchingGames(searchVal);
            if(!matched){
                noResults(searchVal);
            }
        }, 500);
    } else {
        noResults(searchVal);
    }
    searchInput.value = '';
}

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter"){
        executeSearch()
    }
});

searchBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    executeSearch();
});
