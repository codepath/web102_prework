import GAMES_DATA from './games.js';
const GAMES_JSON = JSON.parse(GAMES_DATA)

// Game Cards area
const gamesContainer = document.getElementById("games-container");
addGamesToPage(GAMES_JSON);

//Main Information Cards
const contributionsCard = document.getElementById("num-contributions");
contributionsCard.innerHTML = `${GAMES_JSON.reduce( (acc, game) => { return acc + game.backers; }, 0).toLocaleString("en-US")}`;
const raisedCard = document.getElementById("total-raised");
raisedCard.innerHTML = `$${GAMES_JSON.reduce( (acc, game) => { return acc + game.pledged; }, 0).toLocaleString("en-US")}`;
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length}`

//Funding Information
const descriptionContainer = document.getElementById("description-container");
let numUnderfundedGames = filterGamesByFunding("lesser");
let numFundedGames = filterGamesByFunding("greater");
displayFundingInfo();

//Buttons
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames); 

function deleteChildElements(parent) { //clear gamesContainer to prepare for different group of game cards
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function addGamesToPage(games) { //add game cards to the page
    for(let i = 0; i < games.length; i++)
    {
        let gameDiv = document.createElement("div");
        gameDiv.setAttribute("class", "game-card");

        gameDiv.innerHTML = `
        <img src="${games[i].img}" class="game-img">
        <h2>${games[i].name}</h2>
        <p>Info: ${games[i].description}</p>
        <p>Pledged: $${games[i].pledged.toLocaleString("en-US")}</p>
        `;
        gamesContainer.appendChild(gameDiv);
    }
}

function filterUnfundedOnly() { // show only games that have not reached their funding goal
    deleteChildElements(gamesContainer);
    addGamesToPage(numUnderfundedGames);
    console.log("Underfunded Games: ", numUnderfundedGames);
    return numUnderfundedGames;

    // let underfundedGames = GAMES_JSON.filter( (games) => { //implemented into one function filterGamesByFunding()
    //     games.pledged < games.goal ? numUnderfundedGames++ : null;
    //     return games.pledged < games.goal;
    // });

}

function filterFundedOnly() { // show only games that have reached/surpassed their funding goal
    deleteChildElements(gamesContainer);
    addGamesToPage(numFundedGames);
    console.log("Funded Games: ", numFundedGames);
    return numFundedGames;

    // let fundedGames = GAMES_JSON.reduce((acc, games) => { //implemented into one function filterGamesByFunding()
    //     if(games.pledged >= games.goal)
    //     {
    //         numFundedGames++;
    //         acc.push(games);    
    //     }
    //     return acc;
    // }, []);

}

function showAllGames() { // show all games cards
    deleteChildElements(gamesContainer);

    addGamesToPage(GAMES_JSON);
    console.log("All Games: ", GAMES_JSON);
}

function displayFundingInfo() { // display summary of funding information into two sentences
    let gameStr = "game";
    let remainStr = "remain";

    if(numUnderfundedGames.length === 0) 
    {
        gameStr += "s";
        remainStr += " unfunded. Thank you for helping fund these amazing games!";
    }
    else if(numUnderfundedGames.length === 1) remainStr += "s unfunded. We need your help to fund this amazing game!";
    else
    {
        gameStr += "s";
        remainStr += " unfunded. We need your help to fund these amazing games!";
    }
    let gameDisplayStr = document.createElement("p");
    gameDisplayStr.innerHTML = `A total of ${raisedCard.innerHTML} has been raised for ${GAMES_JSON.length} games. Currently, ${numUnderfundedGames.length} ${gameStr} ${remainStr}`
    descriptionContainer.appendChild(gameDisplayStr);
    console.log("Funding Info: ", gameDisplayStr)
    
    return gameDisplayStr;
}

const firstGameContainer = document.getElementById("first-game"); // Most funded game
const secondGameContainer = document.getElementById("second-game"); // Second most funded game

const sortedGames =  GAMES_JSON.sort( (item1, item2) => { // What to do with this?
    return item2.pledged - item1.pledged;
});

const [firstGame, secondGame, ...restOfGames] = GAMES_JSON; // Destructuring assignment to get the first two games from the sorted array
const firstGameChild = document.createElement("h4");
firstGameChild.innerHTML = firstGame.name;
const secondGameChild = document.createElement("h4");
secondGameChild.innerHTML = secondGame.name;

firstGameContainer.appendChild(firstGameChild);
secondGameContainer.appendChild(secondGameChild);

/*PERSONAL ADDITION*/

function filterGamesByFunding(filterParameter) // filter by funding implemented as one function to reduce code duplication
{
    let filteredGames = 0;

    if(filterParameter === "greater") // filter for games that have reached their funding goal
    {
        filteredGames = GAMES_JSON.reduce((acc, games) => {
            games.pledged - games.goal >= 0 ? acc.push(games) : 0;
            return acc;
        }, []);
    }
    else if(filterParameter === "lesser") // filter for games that have not reached their funding goal
    {
        filteredGames = GAMES_JSON.reduce((acc, games) => {
            games.pledged - games.goal < 0 ? acc.push(games) : 0;
            return acc;
        }, []);
    }
    else{
        console.log("Invalid filter parameter. Please use 'greater' or 'lesser'.");
        showAllGames(); // if no filter is applied, show all games
        return GAMES_JSON.length;
    }
    console.log("Filtered Array: ", filteredGames);
    return filteredGames;
}