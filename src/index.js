function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';
import QUOTES from './quotes.js';
// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)
const quotes = JSON.parse(QUOTES)
shuffle(quotes);
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
    var vall = 1;
    for (let index = 0; index < games.length; index++) {
        const element = games[index];
        let new_ele = document.createElement("div");
        new_ele.classList.add("game-card");
        gamesContainer.appendChild(new_ele);
        let img = document.createElement("img");
        img.classList.add("game-img");
        img.src = games[index].img;
        new_ele.appendChild(img);
        let name = document.createElement("p");
        name.classList.add("game-name");
        name.innerHTML = games[index].name;
        name.style.fontWeight = "bolder";
        new_ele.appendChild(name);
        let description = document.createElement("p");
        description.classList.add("game-description");
        description.innerHTML = games[index].description;
        // description.style.fontWeight = "bolder";
        new_ele.appendChild(description);
        let backers = document.createElement("p");
        backers.classList.add("game-backers");
        backers.innerHTML = `Backers: ${games[index].backers}`;
        // backers.style.fontWeight = "bolder";
        new_ele.appendChild(backers);
        // let back = document.createElement("p");
        // back.classList.add("game-card");
        // back.classList.add("game-card-back");
        // back.innerHTML = games[index].description;
        // new_ele.appendChild(back);
        new_ele.setAttribute("id",vall++);
        let tooltip = document.createElement("div");
        tooltip.classList.add("tooltip");
        new_ele.appendChild(tooltip);
        var tooltip_text = document.createElement("div");
        tooltip_text.classList.add("tooltip-text");
        tooltip_text.innerHTML = quotes[index];
        tooltip.appendChild(tooltip_text);
        new_ele.addEventListener("mouseover", function(){
            tooltip.style.visibility = "visible";
        })
        new_ele.addEventListener("mouseout", function(){
            tooltip.style.visibility = "hidden";
        })
    }
        // create a new div element, which will become the game card

        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
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
let individual_contribution = GAMES_JSON.reduce((acc, GAMES_JSON) => {
    return acc + GAMES_JSON.backers;
},0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = individual_contribution;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
let amount_raised = GAMES_JSON.reduce((acc, GAMES_JSON) => {
    return acc + GAMES_JSON.pledged;
},0);
// set inner HTML using template literal
raisedCard.innerHTML = `$${amount_raised.toLocaleString('en-US')}`;

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
    let unfunded_games = GAMES_JSON.filter( (arr) => {
        return arr.pledged < arr.goal;
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfunded_games);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let funded_games = GAMES_JSON.filter( (arr) => {
        return arr.pledged >= arr.goal;
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(funded_games);
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
let unfunded = GAMES_JSON.filter( (arr) => {
    return arr.pledged < arr.goal;
});
let totalamount = GAMES_JSON.reduce((acc, GAMES_JSON) => {
    return acc + GAMES_JSON.pledged;
},0);
// create a string that explains the number of unfunded games using the ternary operator
const displaystr = `A total of $${totalamount.toLocaleString('en-US')} has been raised for ${GAMES_JSON.length} ${GAMES_JSON.length > 1? "games": "game"}.
                    Currently, ${unfunded.length} ${unfunded.length > 1? "games": "game"} ${unfunded.length > 1? "remain": "remains"} unfunded. We need your help
                    to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
let display_ele = document.createElement("p");
display_ele.innerHTML = displaystr;
descriptionContainer.appendChild(display_ele);
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
let twopopular_games = [sortedGames[0], sortedGames[1], ...sortedGames];
// create a new element to hold the name of the top pledge game, then append it to the correct element
let first = document.createElement("p");
first.innerHTML = twopopular_games[0].name;
// do the same for the runner up item
let second = document.createElement("p");
second.innerHTML = twopopular_games[1].name;
// append both elements to the correct containers
firstGameContainer.appendChild(first);
secondGameContainer.appendChild(second);
/************************************************************************************/
// var ele = document.getElementById("1");
// ele.addEventListener("mouseover", function() {
//     ele.style.transform = "rotateY(180deg)";
// })
// ele.addEventListener("mouseout", function() {
//     console.log(event.target);
//     ele.style.transform = "rotateY(0deg)";
// })
let back_top = document.getElementById("back-to-top-btn");
back_top.addEventListener("click", function(){
    window.scrollTo(820,820);
})
let cut = document.getElementById("cut-block");
cut.addEventListener("click", function() {
    document.getElementById("letter-box").style.display = "none"; 
})
document.getElementById("submit-email").addEventListener("click", subscribe);
function subscribe(){
    document.getElementById("letter-box").style.display = "none";
}