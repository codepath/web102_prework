/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
// customization: function modify so GamesContainer child element can be constant
// enable to addEventListener for each child
// this function will hide element rather than deleting them.
function deleteChildElements() {
  for (let i = 0; i < gamesContainer.childElementCount; i++) {
    gamesContainer.children[i].classList.add("hidden");
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
// customization: initailize an object array to get all div of all game-card
const allGames = [];
function addGamesToPage(games) {
  // loop over each item in the data
  for (let i = 0; i < games.length; i++) {
    // create a new div element, which will become the game card
    const newDiv = document.createElement("div");

    // add the class game-card to the list
    newDiv.classList.add("game-card");

    // set the inner HTML using a template literal to display some info
    // about each game
    // TIP: if your images are not displaying, make sure there is space
    // between the end of the src attribute and the end of the tag ("/>")
    newDiv.innerHTML = `
            <img class='game-img' src=${games[i].img}>
            <h2>${games[i].name}</h2>
            <h4>${games[i].description}</h4>
            <h4>Backers: ${games[i].backers}</h4>
        `;

    // customization: adding border color to game card
    newDiv.classList.add(
      `${
        games[i].pledged < games[i].goal
          ? "unfunded-game-color"
          : "funded-game-color"
      }`
    );
    // append the game to the games-container
    gamesContainer.appendChild(newDiv);

    // customization: adding new game object to array
    const newGame = {
      name: games[i].name,
      description: games[i].description,
      pledged: games[i].pledged,
      goal: games[i].goal,
      backers: games[i].backers,
      element: newDiv,
    };
    allGames.push(newGame);
  }
}
addGamesToPage(GAMES_JSON);

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((sum, GAMES_JSON) => {
  return sum + GAMES_JSON.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString("en-US")}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalPledged = GAMES_JSON.reduce((sum, GAMES_JSON) => {
  return sum + GAMES_JSON.pledged;
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `💰${totalPledged.toLocaleString("en-US")}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
// customization: function modify so GamesContainer child element can be constant
// enable to addEventListener for each child
// this function will hide element rather than deleting them.
function filterUnfundedOnly() {
  deleteChildElements();
  const listOfUnfundedGame = allGames.filter((allGames) => {
    return allGames.pledged < allGames.goal;
  });
  const listOfUnfundedGameName = listOfUnfundedGame.map((e) => e.name);
  for (let i = 0; i < gamesContainer.childElementCount; i++) {
    const gameName =
      gamesContainer.children[i].getElementsByTagName("h2")[0].innerHTML;
    if (listOfUnfundedGameName.includes(gameName)) {
      gamesContainer.children[i].classList.remove("hidden");
    }
  }

  // change the first button color
  changeButtonColor(0);
}

// show only games that are fully funded
// customization: function modify so GamesContainer child element can be constant
// enable to addEventListener for each child
// this function will hide element rather than deleting them.
function filterFundedOnly() {
  deleteChildElements();
  const listOfFundedGame = allGames.filter((allGames) => {
    return allGames.pledged >= allGames.goal;
  });
  const listOfFundedGameName = listOfFundedGame.map((e) => e.name);
  for (let i = 0; i < gamesContainer.childElementCount; i++) {
    const gameName =
      gamesContainer.children[i].getElementsByTagName("h2")[0].innerHTML;
    if (listOfFundedGameName.includes(gameName)) {
      gamesContainer.children[i].classList.remove("hidden");
    }
  }

  // change the second button color
  changeButtonColor(1);
}

// show all games
// customization: function modify so GamesContainer child element can be constant
// enable to addEventListener for each child
// this function will hide element rather than deleting them.
function showAllGames() {
  for (let i = 0; i < gamesContainer.childElementCount; i++) {
    gamesContainer.children[i].classList.remove("hidden");
  }

  // change the thrid button color
  changeButtonColor(2);
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
const numOfUnfundedGame = GAMES_JSON.reduce((sum, GAMES_JSON) => {
  return sum + (GAMES_JSON.pledged < GAMES_JSON.goal);
}, 0);

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of $${totalPledged.toLocaleString(
  "en-US"
)} has been raised for ${
  GAMES_JSON.length
} games. Currently, ${numOfUnfundedGame} ${
  numOfUnfundedGame <= 1 ? "game" : "games"
} remains unfunded. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
const newPara = document.createElement("p");
newPara.setAttribute("class", "sub-section-info");
newPara.innerHTML = `${displayStr}`;
descriptionContainer.appendChild(newPara);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

// !Reminder sort mutate array
const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [firstGame, secondGame, ...others] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameHolder = document.createElement("div");
firstGameHolder.setAttribute("id", "first-game-holder");
firstGameHolder.innerHTML = `${firstGame.name}`;
firstGameContainer.append(firstGameHolder);

// do the same for the runner up item
const secondGameHolder = document.createElement("div");
secondGameHolder.setAttribute("id", "second-game-holder");
secondGameHolder.innerHTML = `${secondGame.name}`;
secondGameContainer.append(secondGameHolder);

// ------------------------  customization  --------------------------------------
const searchInput = document.querySelector("[data-search]");

// Removing all animation so no werid action would happen
function removeAnimation() {
  for (let i = 0; i < allGames.length; i++)
    if (allGames[i].element.classList.contains("flashAnimation"))
      allGames[i].element.classList.remove("flashAnimation");
}

// allow user to scroll to a specific game when input the game name
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    removeAnimation();
    const userInput = e.target.value.toLowerCase();
    console.log(`User input: ${userInput}`);
    for (const i in allGames) {
      if (allGames[i].name.toLowerCase().includes(userInput)) {
        allGames[i].element.scrollIntoView({ behavior: "smooth" });
        allGames[i].element.classList.add("flashAnimation");
        break;
      }
    }
    e.target.value = null;
  }
});

// Changing color for the button (switching)
const allButton = document.getElementById("button-container");
function changeButtonColor(indexBtn) {
  removeAnimation();
  for (let i = 0; i < allButton.childElementCount; i++) {
    allButton.children[i].classList.remove("active");
  }
  allButton.children[indexBtn].classList.add("active");
}

// scrolling for gameSection button
const gameSectionBtn = document.getElementById("gameSection-btn");
gameSectionBtn.addEventListener("click", (e) => {
  document
    .querySelector(".begin-game-section")
    .scrollIntoView({ behavior: "smooth" });
});

// this is for Scroll to Top button
const toTop = document.querySelector(".to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) toTop.classList.add("active");
  else toTop.classList.remove("active");
});

const supportGameLabel = document.getElementById("support-game-label");
const supportBtnConfirm = document.querySelector(".support-btn.confirm");
const supportHeader = document.querySelector(".support-header");
const supportFundInfo = document.querySelector(".support-fund-info");
const supportBtnCancel = document.querySelector(".support-btn.cancel");
const supportTab = document.querySelector(".support-tab");
const fundInput = document.querySelector(".fund-input");

// The user click on a game
// AddEventListener for every stats-card
let chosenGame = 0;
for (let i = 0; i < gamesContainer.childElementCount; i++) {
  gamesContainer.children[i].addEventListener("click", () => {
    const gameName =
      gamesContainer.children[i].getElementsByTagName("h2")[0].innerHTML;
    supportGameLabel.innerHTML = `${gameName}`;
    supportTab.classList.remove("hidden");

    for (let i = 0; i < allGames.length; i++) {
      if (allGames[i].name === gameName) chosenGame = i;
    }
  });
}

// Confirm button in Support Tab
let supportSubmit = false;
supportBtnConfirm.addEventListener("click", (e) => {
  if (!supportSubmit) {
    supportHeader.textContent = "Thank you for supporting";
    supportFundInfo.textContent = "The amount you funded is";
    supportBtnCancel.classList.add("hidden");
    supportBtnConfirm.textContent = "Confirm";
  } else {
    supportTab.classList.add("hidden");
    supportHeader.textContent = "Support";
    supportFundInfo.textContent = "How much would you like to fund?";
    supportBtnCancel.classList.remove("hidden");
    supportBtnConfirm.textContent = "Submit";
    console.log(allGames[chosenGame].name);
    allGames[chosenGame].backers += 1;
    console.log(allGames[chosenGame].backers);
    allGames[chosenGame].pledged += Number(fundInput.value);
    fundInput.value = null;
    setCorrectInfo();
  }
  supportSubmit = !supportSubmit;
});

// Cancel button in Support Tab
supportBtnCancel.addEventListener("click", (e) => {
  supportTab.classList.add("hidden");
  fundInput.value = null;
});

const subSectionInfo = document.querySelector(".sub-section-info");
// This function help to reset/update every changed element so user can see it.
function setCorrectInfo() {
  const totalRaised = allGames.reduce((sum, allGames) => {
    return sum + allGames.pledged;
  }, 0);

  let unfundedNumOfGame = 0
  for (let i = 0 ; i < allGames.length; i++)
    if (allGames[i].pledged < allGames[i].goal)
        unfundedNumOfGame++
        
  const displayStr = `A total of $${totalRaised.toLocaleString(
    "en-US"
  )} has been raised for ${
    allGames.length
  } games. Currently, ${unfundedNumOfGame} ${
    unfundedNumOfGame <= 1 ? "game" : "games"
  } remains unfunded. We need your help to fund these amazing games!`;

  subSectionInfo.innerHTML = `${displayStr}`;

  const totalContributions = allGames.reduce((sum, allGames) => {
    return sum + allGames.backers;
  }, 0);
  contributionsCard.innerHTML = `${totalContributions.toLocaleString("en-US")}`;

  raisedCard.innerHTML = `💰${totalRaised.toLocaleString("en-US")}`;

  const copyAllGames = allGames.slice();
  const sortedGames = copyAllGames.sort((item1, item2) => {
    return item2.pledged - item1.pledged;
  });
  let [firstGame, secondGame, ...others] = sortedGames;

  firstGameHolder.innerHTML = `${firstGame.name}`;
  secondGameHolder.innerHTML = `${secondGame.name}`;

  if (
    gamesContainer.children[chosenGame].classList.contains(
      "unfunded-game-color"
    ) &&
    allGames[chosenGame].pledged >= allGames[chosenGame].goal
  ) {
    gamesContainer.children[chosenGame].classList.remove("unfunded-game-color");
    gamesContainer.children[chosenGame].classList.add("funded-game-color");
  }
  if (
    gamesContainer.children[chosenGame].classList.contains(
      "funded-game-color"
    ) &&
    allGames[chosenGame].pledged < allGames[chosenGame].goal
  ) {
    gamesContainer.children[chosenGame].classList.add("unfunded-game-color");
    gamesContainer.children[chosenGame].classList.remove("funded-game-color");
  }
  const backersLabel =
    gamesContainer.children[chosenGame].getElementsByTagName("h4")[1];
  backersLabel.innerHTML = `Backers: ${allGames[chosenGame].backers}`;
}
