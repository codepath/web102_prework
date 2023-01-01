/*****************************************************************************
 
*****************************************************************************/

import GAMES_DATA from "./games.js";

const GAMES_JSON = JSON.parse(GAMES_DATA);

function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

const gamesContainer = document.getElementById("games-container");

const contributionsCard = document.getElementById("num-contributions");
const raisedCard = document.getElementById("total-raised");
const gamesCard = document.getElementById("num-games");

function addGamesToPage(games) {
  for (let i = 0; i < games.length; i++) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("game-card");

    newDiv.innerHTML = `
            <h3>${games[i].name}</h3>
            <img class="game-img" src="${games[i].img}">
            <p>${games[i].description}</p>
            <p>Backers: ${games[i].backers}</p>
        `;
    gamesContainer.append(newDiv);
  }
}

addGamesToPage(GAMES_JSON);

const contributionsCount = GAMES_JSON.reduce((acc, count) => {
  return acc + count.backers;
}, 0);
contributionsCard.innerHTML = contributionsCount.toLocaleString("en-US");

const raisedCount = GAMES_JSON.reduce((acc, count) => {
  return acc + count.pledged;
}, 0);
raisedCard.innerHTML = "$" + raisedCount.toLocaleString("en-US");

gamesCard.innerHTML = GAMES_JSON.length;

const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  const unfundedGame = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal;
  });

  addGamesToPage(unfundedGame);
}

function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  const fundedGame = GAMES_JSON.filter((game) => {
    return game.pledged > game.goal;
  });

  addGamesToPage(fundedGame);
}

function showAllGames() {
  deleteChildElements(gamesContainer);

  addGamesToPage(GAMES_JSON);
}

fundedBtn.addEventListener("click", filterFundedOnly);
unfundedBtn.addEventListener("click", filterUnfundedOnly);
allBtn.addEventListener("click", showAllGames);

const descriptionContainer = document.getElementById("description-container");

const unfundedGameCount = GAMES_JSON.filter((game) => {
  return game.pledged < game.goal;
}).length;

let descriptionString = `A total of $${raisedCount.toLocaleString(
  "en-US"
)} has been raised for ${GAMES_JSON.length} ${
  GAMES_JSON.length > 1 ? "games" : "game"
}. Currently, ${unfundedGameCount} ${
  unfundedGameCount > 1 ? "games remain" : "game remains"
} unfunded. We need your help to fund these amazing games!`;

const newDescriptionDiv = document.createElement("p");
newDescriptionDiv.textContent = descriptionString;

descriptionContainer.append(newDescriptionDiv);

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

const [top1, top2, ...others] = sortedGames;

const topGameElement = document.createElement("p");
topGameElement.textContent = top1.name;
firstGameContainer.append(topGameElement);

const secondGameElement = document.createElement("p");
secondGameElement.textContent = top2.name;
secondGameContainer.append(secondGameElement);
