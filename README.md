# WEB102 Prework - *GamesFunded*

Submitted by: **Muhammad Asad**

**GamesFunded** is a website for the company Sea Monster Crowdfunding that displays information about the games they have funded.

Time spent: **20** hours spent in total

## Required Features

The following **required** functionality is completed:

* [x] The introduction section explains the background of the company and how many games remain unfunded.
* [x] The Stats section includes information about the total contributions and dollars raised as well as the top two most funded games.
* [x] The Our Games section initially displays all games funded by Sea Monster Crowdfunding
* [x] The Our Games section has three buttons that allow the user to display only unfunded games, only funded games, or all games.

The following **optional** features are implemented:

* [x] List anything else that you can get done to improve the app functionality! 
* [x]Navigation Bar: A clean navigation bar is placed at the top of the website.
* [x]Includes an “Our Games” link that smoothly scrolls/takes users directly to the Our Games section.
* [x] Search Functionality: A search bar is integrated within the navigation bar. Users can search for specific games from the funded collection.
* [x]On search, the website blurs all other games and highlights/displays only the game that matches the query.

## Video Walkthrough

Here's a walkthrough of implemented features:

<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...  
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes
Learned how to parse JSON data and dynamically create game cards from it.

Implemented a navigation bar with:

“Our Games” link → scrolls directly to the game section.

A Search Bar → highlights only the searched game and blurs others for better focus.

Added filter buttons (Funded / Unfunded / Show All Games) to easily categorize projects.

Faced a challenge when trying to add a page-click reset feature (to reset the blurred games). It conflicted with the filter buttons, so I removed it for smoother functionality.

Practiced DOM manipulation (adding/removing child elements, handling events, updating UI dynamically).

Learned how to use Git & GitHub for version control — committing changes, pushing to remote, and handling mistakes like accidentally adding a nested repository.

Improved problem-solving skills by debugging issues with event listeners and button conflicts.

Realized the importance of user experience (UX) — sometimes fewer features make the website more intuitive.


## Describe any challenges encountered while building the app.
While implementing the blur effect feature (showing only the searched game while blurring others), I also experimented with an additional feature:

When the user clicks anywhere on the page, the game list should reset and display all games again.

However, this feature conflicted with the Funded / Unfunded / Show All Games buttons — only one button would work at a time.

To avoid this conflict and ensure smooth functionality, I decided to remove the page-click reset feature and kept the original button functionality intact.
## License

    Copyright [yyyy] [name of copyright owner]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
