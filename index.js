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
function addGamesToPage(games){
    for (let i=0;i<games.length;i++){
        let game = games[i]
    
        // create a new div element, which will become the game card
        const gameCard = document.createElement('div')
        // add the class game-card to the list
        gameCard.classList.add('game-card')
        // set the inner HTML using a template literal to display some info 
        // about each game
        gameCard.innerHTML = `
        <img class="game-img" src="${game.img}"/>
        <h2>${game.name}</h2>
        <p>${game.description}</p>
        <p>Pledged: ${game.pledged}</p>
        <p>Goal: ${game.goal}</p>
        <p>Backers: ${game.backers}</p>
        ` 
        // append the game to the games-container
        gamesContainer.append(gameCard)
    }   
}
addGamesToPage(GAMES_JSON)


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalBackers = GAMES_JSON.reduce((acc,game) =>
    acc + game.backers,0
)
// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalBackers.toLocaleString('en-US')}`

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc,game)=>
    acc + game.pledged,0
)
// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString('en-US')}`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length}`


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game=>
        game.pledged < game.goal
    )

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames)
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal )

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames)
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
unfundedBtn.addEventListener('click',filterUnfundedOnly)
fundedBtn.addEventListener('click',filterFundedOnly)
allBtn.addEventListener('click',showAllGames)


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const totalUnfundedGames = GAMES_JSON.filter(game=> game.pledged < game.goal).length
const totalFundedGames = GAMES_JSON.filter(game=> game.pledged >= game.goal).length

// create a string that explains the number of unfunded games using the ternary operator
const totalFundedAmt = GAMES_JSON.reduce((total,game) => total + game.pledged,0)
const fundedGamesDesc = `A total of $${totalFundedAmt.toLocaleString()} has been raised for ${totalFundedGames} games.`
const unfundedGamesDesc = totalUnfundedGames === 0 ?  fundedGamesDesc : `${fundedGamesDesc} There are ${totalUnfundedGames} unfunded games currently.`

// create a new DOM element containing the template string and append it to the description container
const displayUnfundedDesc = document.createElement('p')
displayUnfundedDesc.textContent = unfundedGamesDesc
descriptionContainer.append(displayUnfundedDesc)

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
const [firstGame,secondGame, ...rest] = sortedGames

// create a new element to hold the name of the top pledge game, then append it to the correct element
const top1 = document.createElement('p')
top1.textContent = `${firstGame.name}`
firstGameContainer.append(top1)

// do the same for the runner up item
const top2 = document.createElement('p')
top2.textContent = `${secondGame.name}`
secondGameContainer.append(top2)



// handling search
function handleSearch(){
    const searchQuery = document.getElementById("search-bar").value.toLowerCase().trim();

    const searchResults = GAMES_JSON.filter(game => {
        const gameName = game.name.toLowerCase()
        return gameName.includes(searchQuery)
    })

    deleteChildElements(gamesContainer);
    addGamesToPage(searchResults)
}

const searchBar = document.getElementById("search-bar")
searchBar.addEventListener("input",handleSearch)