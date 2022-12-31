/*****************************************************************************

*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

const GAMES_JSON = JSON.parse(GAMES_DATA)

function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const gamesContainer = document.getElementById("games-container");


// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++) {
        let newDiv = document.createElement("div");
        newDiv.classList.add("game-card")


        newDiv.innerHTML = `
            <h3>${games[i].name}</h3>
            <img class="game-img" src="${games[i].img}">
            <p>${games[i].description}</p>
            <p>Backers: ${games[i].backers}</p>
        `
        gamesContainer.append(newDiv)
    }
}
addGamesToPage(GAMES_JSON)

const contributionsCard = document.getElementById("num-contributions");
const contributionsCount = GAMES_JSON.reduce((acc, count) => {
    return acc + count.backers
}, 0)
contributionsCard.innerHTML = contributionsCount.toLocaleString("en-US")

const raisedCard = document.getElementById("total-raised");
const raisedCount = GAMES_JSON.reduce((acc, count) => {
    return acc + count.pledged
}, 0)
raisedCard.innerHTML = "$" + raisedCount.toLocaleString("en-US")

const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = GAMES_JSON.length

function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    const unfundedGame = GAMES_JSON.filter(game => {
        return game.pledged < game.goal
    })

    addGamesToPage(unfundedGame)
}

function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    const fundedGame = GAMES_JSON.filter(game => {
        return game.pledged > game.goal
    })

    addGamesToPage(fundedGame)
}

function showAllGames() {
    deleteChildElements(gamesContainer);

    addGamesToPage(GAMES_JSON)
}

const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

fundedBtn.addEventListener("click", filterFundedOnly)
unfundedBtn.addEventListener("click", filterUnfundedOnly)
allBtn.addEventListener("click", showAllGames)

const descriptionContainer = document.getElementById("description-container");

const unfundedteredGameCount = GAMES_JSON.filter(game => {
    return game.pledged < game.goal
}).length

let descriptionString = `A total of $${raisedCount.toLocaleString("en-US")} has been raised for ${GAMES_JSON.length} ${(GAMES_JSON.length) > 1 ? "games" : "game"}. Currently, ${unfundedteredGameCount} ${unfundedteredGameCount > 1 ? "games remain" : "game remains"} unfunded. We need your help to fund these amazing games!`

const newDescriptionDiv = document.createElement("p")
newDescriptionDiv.textContent = descriptionString

descriptionContainer.append(newDescriptionDiv)

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

const [top1, top2, ...others] = sortedGames

console.log(top1, top2)

let name1, desc1, pl1, goal1, bkrs1, img1 = top1;
let name2, desc2, pl2, goal2, bkrs2, img2 = top2;

const topGameElement = document.createElement("p")
topGameElement.textContent = top1.name
firstGameContainer.append(topGameElement)


const secondGameElement = document.createElement("p")
secondGameElement.textContent = top2.name
secondGameContainer.append(secondGameElement)


// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item