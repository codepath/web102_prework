# GitHub Copilot Instructions for WEB102 Prework

## Overview
This project is a web application for Sea Monster Crowdfunding, showcasing games that have been funded. The application allows users to view information about funded and unfunded games, including statistics on contributions and backers.

## Architecture
- **Main Components**:
  - `index.html`: The main HTML file that structures the application.
  - `index.js`: Contains the logic for importing game data and manipulating the DOM.
  - `games.js`: Stores the JSON data for the games.
  - `style.css`: Styles the application.

- **Data Flow**:
  - The application imports game data from `games.js` into `index.js`, where it is parsed and used to dynamically update the DOM.

## Developer Workflows
- **Building the Project**: Simply open `index.html` in a web browser to view the application.
- **Testing**: Ensure that all required features are functioning as specified in the README.
- **Debugging**: Use browser developer tools to inspect elements and debug JavaScript errors.

## Project-Specific Conventions
- **Data Handling**: Game data is stored in a JSON format within `games.js` and is parsed in `index.js`.
- **DOM Manipulation**: Use the `deleteChildElements` function to clear existing elements before rendering new data.

## Integration Points
- **External Dependencies**: The project uses Google Fonts for styling, imported in `style.css`.
- **Cross-Component Communication**: Data flows from `games.js` to `index.js`, which updates the DOM based on user interactions.

## Key Files
- [index.html](index.html): Main entry point for the application.
- [index.js](index.js): Contains the main logic for data handling and DOM manipulation.
- [games.js](games.js): JSON data source for the games.
- [style.css](style.css): Styles for the application.

---

Please provide feedback on any unclear or incomplete sections to iterate further.