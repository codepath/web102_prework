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
    for (let items in games){
        // create a new div element, which will become the game card
        let gamesCard = document.createElement("div");

        // add the class game-card to the list
        gamesCard.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        const img = document.createElement("div")
        for (let item in games[items]){
            if (item == "img"){
                img.innerHTML += `<img class="game-img" src="${games[items][item]}" />`;
            } else if(item == "name"){
                gamesCard.innerHTML +=`<div><${item}>${games[items][item]}</${item}></div>`;
            } else if(item == "description"){
                gamesCard.innerHTML +=`<div><p><${item}>${games[items][item]}</${item}></p></div>`;
            } else if(item == "backers"){
                gamesCard.innerHTML +=`<div><${item}>Backers: ${games[items][item]}</${item}></div>`;
            }
            gamesCard.prepend(img);
        }
        // append the game to the games-container
        gamesContainer.appendChild(gamesCard);
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
const totalContribution = GAMES_JSON.reduce((total, game) => total + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = totalContribution.toLocaleString();

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);

// set inner HTML using template literal
raisedCard.innerHTML = totalRaised.toLocaleString();

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
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
    const unfunded = GAMES_JSON.filter(game => game.pledged < game.goal);

    // use the function we previously created to add the unfunded games to the DOM
    return addGamesToPage(unfunded);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const funded = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // use the function we previously created to add unfunded games to the DOM
    return addGamesToPage(funded);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    return addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.onclick = filterUnfundedOnly;
fundedBtn.onclick = filterFundedOnly;
allBtn.onclick = showAllGames;

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const totalUnfundedCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator
const displayMessage = totalUnfundedCount > 1 
    ? ` A total of $${totalRaised.toLocaleString()} has been raised for ${GAMES_JSON.length} games. Currently, ${totalUnfundedCount} games remain unfunded. We need your help to fund the amazing games!`
    : ` A total of $${totalRaised.toLocaleString()} has been raised for ${GAMES_JSON.length} games. Currently, ${totalUnfundedCount} games remain unfunded. We need your help to fund the amazing games!`

// create a new DOM element containing the template string and append it to the description container
const paragraph = document.createElement("p");
paragraph.innerText += displayMessage;
descriptionContainer.appendChild(paragraph)

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
const [ { name: first }, { name: second }, { name: third }, { name: fourth } ] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const top1 = document.createElement("p");
const top2 = document.createElement("p");

top1.innerText = first;
top2.innerText = second;

firstGameContainer.append(top1, top2);

// do the same for the runner up item
const top3 = document.createElement("p");
const top4 = document.createElement("p");

top3.innerText = third;
top4.innerText = fourth;

secondGameContainer.append(top3, top4);