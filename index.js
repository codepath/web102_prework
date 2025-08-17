/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';
const GAMES_JSON = JSON.parse(GAMES_DATA)

// create a list of objects to store the data about the games using JSON.parse
// const GAMES_JSON = JSON.parse(GAMES_DATA)

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
    games.forEach((game, index) => {
        // console.log(index, game.name);
        // create a new div element, which will become the game card
        const gamesCard = document.createElement("div")

        // add the class game-card to the list
        gamesCard.classList.add("game-card")
 // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        gamesCard.innerHTML = `
        
        <img src="${game.img}" alt="${game.name}" class="game-img" />
        <h3>${game.name}</h3>
        <p>${game.description}</p>
        <p>Backers: ${game.backers.toLocaleString()}</p>
        `;
        // append the game to the games-container
gamesContainer.appendChild(gamesCard)
    });
}
    const total_game = addGamesToPage(GAMES_JSON)  
    

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

const total_contributions = GAMES_JSON.reduce((total,games)=>{
    // console.log(total, games.backers );
return total +  games.backers
}, 0 )


console.log(total_contributions);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `
        <p>${total_contributions.toLocaleString()}</p>

`
// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const total_rasied =  GAMES_JSON.reduce((total, raised)=>{
return total + raised.pledged
}, 0)
// console.log(total_rasied);

// set inner HTML using template literal
raisedCard.innerHTML = `
    <p>${total_rasied.toLocaleString()}</p>

`
// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
document.getElementById("num-games").textContent = ` ${GAMES_JSON.length}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly(games) {
    return games.filter(game => game.pledged < game.goal);
}





// console.log(filterUnfundedOnly(GAMES_JSON));


// show only games that are fully funded
function filterFundedOnly(games) {
    

    // use filter() to get a list of games that have met or exceeded their goal
    return games.filter(game => game.pledged >= game.goal);
  }

 // use the function we previously created to add unfunded games to the DOM


    //  console.log(filterFundedOnly(GAMES_JSON));




// show all games


showAllGames(GAMES_JSON)
function showAllGames(games) {
    deleteChildElements(gamesContainer);
    addGamesToPage(games);
}


// select each button in the "Our Games" section


// add event listeners with the correct functions to each button
const unfunded_btn = document.getElementById("unfunded-btn")
unfunded_btn.addEventListener("click",()=>{
    deleteChildElements(gamesContainer);
    addGamesToPage(filterUnfundedOnly(GAMES_JSON))
 }
)

 const funded_btn = document.getElementById("funded-btn");

 funded_btn.addEventListener("click",()=>{
    deleteChildElements(gamesContainer);
    addGamesToPage(filterFundedOnly(GAMES_JSON))
    
 })
const all_btn = document.getElementById("all-btn")
all_btn.addEventListener("click",()=>{
    deleteChildElements(gamesContainer);
showAllGames(GAMES_JSON)
})


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const array_unfunded_game = filterUnfundedOnly(GAMES_JSON)
const num_of_unfunded  =  array_unfunded_game.length;

// console.log(num_of_unfunded);

const display_str = 
  num_of_unfunded > 0 
    ? `A total of $${total_rasied.toLocaleString()} has been raised, but ${num_of_unfunded} game${num_of_unfunded > 1 ? "s" : ""} still need${num_of_unfunded > 1 ? "" : "s"} funding. We appreciate your love.` 
    : `A total of $${total_rasied.toLocaleString()} has been raised, and all games are fully funded. Thank you for your support!`;

// console.log(display_str);


// create a new DOM element containing the template string and append it to the description container
        const template_str = document.createElement("p")
        template_str.innerHTML = `
        ${display_str}
        
        `
descriptionContainer.appendChild(template_str)
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */
const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => item2.pledged - item1.pledged);

// Destructure the top two games
const [first_game, Second_game, ...others] = sortedGames;

// Create a card for the top game
const firstGameEl = document.createElement("div");
firstGameEl.classList.add("game-card");
firstGameEl.innerHTML = `
    <img src="${first_game.img}" alt="${first_game.name}" class="game-img" />
    <h3>${first_game.name}</h3>
    <p>${first_game.description}</p>
    <p>Pledged: $${first_game.pledged.toLocaleString()}</p>
`;
firstGameContainer.appendChild(firstGameEl);

// Create a card for the second game
const secondGameEl = document.createElement("div");
secondGameEl.classList.add("game-card");
secondGameEl.innerHTML = `
    <img src="${Second_game.img}" alt="${Second_game.name}" class="game-img" />
    <h3>${Second_game.name}</h3>
    <p>${Second_game.description}</p>
    <p>Pledged: $${Second_game.pledged.toLocaleString()}</p>
`;
secondGameContainer.appendChild(secondGameEl);

const searchBar = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");
const searchResult = document.getElementById("search-result");
// const gamesContainer = document.getElementById("games-container"); // where all games are displayed

// Function to search and display game
function searchGame() {
    const query = searchBar.value.toLowerCase();

    // find game by name
    const foundGame = GAMES_JSON.find(game => game.name.toLowerCase().includes(query));

    if (foundGame) {
        // blur or dim the background content
        // gamesContainer.style.opacity = "0.2";
        gamesContainer.classList.add("blurred")

        // clear old search results
        searchResult.innerHTML = "";

        // create a new card for the found game
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");
        gameCard.innerHTML = `
            <h2>${foundGame.name}</h2>
            <img src="${foundGame.img}" alt="${foundGame.name}" class="game-img" />
            <p><strong>Pledged:</strong> $${foundGame.pledged}</p>
            <p><strong>Goal:</strong> $${foundGame.goal}</p>
            <p><strong>Backers:</strong> ${foundGame.backers}</p>
        `;
        searchResult.appendChild(gameCard);
    } else {
        searchResult.innerHTML = `<p>No game found.</p>`;
        gamesContainer.style.opacity = "1"; // reset background if no match
    }
}

const searchForm = document.querySelector('.search-container');
searchBar.addEventListener("keydown",(e)=>{
    if (e.key == "Enter"){
        e.preventDefault()
        searchGame()
    }
})
document.addEventListener('click', function (event) {
  // check if click happened outside games container AND outside search form
  if (
    !gamesContainer.contains(event.target) &&
    !searchForm.contains(event.target)
  ) {
    // remove blur
    gamesContainer.classList.remove('blurred');

    // reset games
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
  }
});


// Mobile menu toggle
document.getElementById("menu-toggle").addEventListener("click", () => {
  document.getElementById("nav-links").classList.toggle("show");
});

// Add event listener to button
searchBtn.addEventListener("click",searchGame);
