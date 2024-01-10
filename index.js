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

    // loop over each item in the argument games
    for (let i = 0; i < games.length; i++){
        let gameCard = document.createElement('div')
        gameCard.classList.add('game-card');

        gameCard.innerHTML = `
            <img src="${games[i].img}" class="game-img" alt="Image of ${games[i].name}" />
            <h3>${games[i].name}</h3>
            <p>${games[i].description}</p>
            `;
        
        document.getElementById('games-container').appendChild(gameCard);
    }


        // create a new div element, which will become the game card


        // add the class game-card to the div's class list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // Include the game's image and at least 2 of the game's other attributes
        // give the image the class game-img
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

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

const totalBackers = GAMES_JSON.reduce((sum, game) => {
    return sum + game.backers; 
}, 0); 
const totalBackersWithFormat = totalBackers.toLocaleString('en-US');
contributionsCard.textContent = `${totalBackersWithFormat}`;

// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((sum, game) => {
    return sum + game.pledged;
}, 0);
const totalRaisedWithFormat = totalRaised.toLocaleString('en-US');
raisedCard.textContent = `$${totalRaisedWithFormat}`;
// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalGames = GAMES_JSON.length;  
const totalGamesWithFormat = totalGames.toLocaleString('en-US');
gamesCard.textContent = totalGamesWithFormat;  

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfundedGames = GAMES_JSON.filter(game => {
        return game.pledged < game.goal;
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let fundedGames = GAMES_JSON.filter(game => {
        return game.pledged >= game.goal;
    });

    addGamesToPage(fundedGames);

    // use the function we previously created to add unfunded games to the DOM
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
unfundedBtn.addEventListener("click", function() {
    filterUnfundedOnly();
});
fundedBtn.addEventListener("click", function() {
    filterFundedOnly();
});
allBtn.addEventListener("click", function() {
    showAllGames();
});

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.reduce((count, game) => {
    return game.pledged < game.goal ? count + 1 : count;
}, 0); 

// create a string that explains the number of unfunded games using the ternary operator
const unfundedStatement = unfundedGamesCount === 1 ? "game remains" : "games remain";

const fundingStatement = `A total of $${totalRaised.toLocaleString('en-US')} has been raised for ${totalGames} games. Currently, ${unfundedGamesCount} ${unfundedStatement} unfunded. We need your help to fund these amazing games!`;


// create a new DOM element containing the template string and append it to the description container
const fundingParagraph = document.createElement("p");
fundingParagraph.textContent = fundingStatement;
descriptionContainer.appendChild(fundingParagraph);

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
const [firstGame, secondGame] = sortedGames;
// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameElement = document.createElement("p")
firstGameElement.textContent = `Top Funded Game: ${firstGame.name}`;
firstGameContainer.appendChild(firstGameElement);

// do the same for the runner up item
const secondGameElement = document.createElement("p")
secondGameElement.textContent = `Runner Up Funded Game: ${secondGame.name}`;
secondGameContainer.appendChild(secondGameElement);

/************************************************************************************
 * Challenge 7 Step 3: Customization
 * Calculate average donation amount per contribution and display
 * Search function for game cards
 */
const backerContainer = document.getElementById("backer-container");
const backerMessage = document.createElement("p")

// use filter or reduce to count the number of unfunded games
const averageDonation =  totalRaised / totalBackers;
const averageDonationRounded = Number(averageDonation.toFixed(2));

const averageMessage = `We are a community-funded initiative with an average donation of $${averageDonationRounded.toLocaleString('en-US')} !`;

backerMessage.textContent = averageMessage;
backerContainer.appendChild(backerMessage);

// Basic search functionality for the game cards
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#search-button').addEventListener('click', performSearch);
});

function performSearch() {
    var searchTerm = document.getElementById('search-input').value.toLowerCase();
    var items = document.querySelectorAll('.game-card'); 

    items.forEach(function(item) {
        if (item.textContent.toLowerCase().includes(searchTerm)) {
            item.style.display = ''; 
        } else {
            item.style.display = 'none';
        }
    });
}
