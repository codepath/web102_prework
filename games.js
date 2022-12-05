const games = ` [
      {
        "name": "Heroes Of Mythic Americas",
        "description": "An exciting 5e RPG supplement that heroically represents pre-Columbian American cultures and mythologies",
        "pledged": 1572,
        "goal": 10000,
        "backers": 9,
        "img": "https://ksr-ugc.imgix.net/assets/039/285/598/4baabf51064859097b2b80531181f2d7_original.png?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1669040550&auto=format&frame=1&q=92&s=765bfc030e7ae01961fa137d3376bfce"
      },
      {
        "name": "Cube Monster",
        "description": "Be the first champion to reach the top of Mount Kubia in a solo or competitive engine building strategy game",
        "pledged": 29446,
        "goal": 20000,
        "backers": 321,
        "img": "https://ksr-ugc.imgix.net/assets/039/287/071/d32e0d2860731d48e862555bb92ad6f3_original.jpg?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1669051717&auto=format&frame=1&q=92&s=d4b5f791d7fef0f76f1eb316d3aa32b1"
      },
      {
        "name": "Zoo Tycoon: The Board Game",
        "description": "Your zoo in a box with more than 230 Animal Meeples. A highly thematic board game experience for 1-4 players.",
        "pledged": 442602,
        "goal": 78480,
        "backers": 3869,
        "img": "https://ksr-ugc.imgix.net/assets/039/053/444/95800934104d47ca7a854b754efe9c7b_original.png?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1666905924&auto=format&frame=1&q=92&s=4545dc866bdfe679e7fb2933b21a3aec"
      },
      {
        "name": "Deity Tarot",
        "description": "A fully illustrated 78-card tarot deck with a divinely exalted take on the famous Smith-Waite tarot deck.",
        "pledged": 109,
        "goal": 8000,
        "backers": 3,
        "img": "https://ksr-ugc.imgix.net/assets/039/259/884/80abdc060c41fb569906049ecd18d9fd_original.jpg?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1668727578&auto=format&frame=1&q=92&s=2a3fb39a3592e7cc7c963df8d36aabf8"
      },
      {
        "name": "Camouflag | A hand-painting puzzle/adventure game",
        "description": "Paint your own camouflage to retrieve information, access secret locations and remove the threat to your fellow flying squirrels.",
        "pledged": 698,
        "goal": 5140,
        "backers": 9,
        "img": "https://ksr-ugc.imgix.net/assets/039/264/352/7ba647d3eb2cc2b19f2d4e15af3e8d1a_original.png?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1668775303&auto=format&frame=1&q=92&s=3b12b44c9f3e032501a87d3475a134ef"
      },
      {
        "name": "Beep Bapp Boom",
        "description": "The time to explode is getting shorter and shorter, please be alert!",
        "pledged": 44,
        "goal": 18133,
        "backers": 2,
        "img": "https://ksr-ugc.imgix.net/assets/035/051/828/d53547b078804e323de92f5efb04b372_original.jpg?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1632903414&auto=format&frame=1&q=92&s=f8ecd6270ee9ea5fe4e078471b2f3126"
      },
      {
        "name": "Frosthaven",
        "description": "Euro-inspired dungeon crawling sequel to the 2017 smash hit Gloomhaven",
        "pledged": 69608,
        "goal": 500000,
        "backers": 3193,
        "img": "https://ksr-ugc.imgix.net/assets/028/927/688/14a04c0a894fc04de4aae62f53a7c2a0_original.jpg?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1588366301&auto=format&frame=1&q=92&s=aaf3e6a48b9d91d6c0758b48e4c218d8"
      },
      {
        "name": "Mislight - An Adventure Game With A Small Touch Of Thriller",
        "description": "Be the Light in a realm of Darkness",
        "pledged": 1036,
        "goal": 3099,
        "backers": 32,
        "img": "https://ksr-ugc.imgix.net/assets/039/271/643/c1abdca1dc712fd93e821605576473d7_original.png?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1668851874&auto=format&frame=1&q=92&s=82a3418f93ef7696c5a94736e7c58516"
      },
      {
        "name": "How to Read Minds 2 Kit: Ellusionist x Peter Turner",
        "description": "Command Attention With These REAL Mind Reading Techniques That Anyone Can Do... The Contents Inside This Kit Will Silence Skeptics.",
        "pledged": 147975,
        "goal": 10000,
        "backers": 1039,
        "img": "https://ksr-ugc.imgix.net/assets/039/236/849/8be8eb1a777e0d5a5b776ef47a12309f_original.jpg?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1668540423&auto=format&frame=1&q=92&s=c134437e56b09cf29ab379b9b7175015"
      },
      {
        "name": "A Wayfarer's Tale",
        "description": "A Wayfarer's Tale, is a Solo to 4 player game where you explore uncharted islands, collecting Treasure while avoiding Monsters.",
        "pledged": 13039,
        "goal": 1183,
        "backers": 1446,
        "img": "https://ksr-ugc.imgix.net/assets/039/028/104/48c2f465b6429c16d417474c25216442_original.jpg?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1666726388&auto=format&frame=1&q=92&s=4e7b12e3cb438e057beda2cbed43f501"
      },
      {
        "name": "Kingdom Death: Monster 1.5",
        "description": "A cooperative nightmare horror game experience",
        "pledged": 94139,
        "goal": 100000,
        "backers": 9264,
        "img": "https://ksr-ugc.imgix.net/assets/014/563/376/7e751b3c0f288979c0d30c244dee94ee_original.png?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1479850460&auto=format&frame=1&q=92&s=ef7a7bc85661dde3579bdc764aeff256"
      }
    ]
  `

export default games;
  