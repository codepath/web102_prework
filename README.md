# WEB102 Prework - *Sea Monster Crowdfunding*

Submitted by: **Lyno Takudzwa Chihwehwete**

**Sea Monster Crowdfunding** is a website for the company Sea Monster Crowdfunding that displays information about the games they have funded.

Time spent: **20** hours spent in total

## Required Features

The following **required** functionality is completed:

* [x] The introduction section explains the background of the company and how many games remain unfunded.
* [x] The Stats section includes information about the total contributions and dollars raised as well as the top two most funded games.
* [x] The Our Games section initially displays all games funded by Sea Monster Crowdfunding
* [x] The Our Games section has three buttons that allow the user to display only unfunded games, only funded games, or all games.

The following **optional** features are implemented:

* [x] Added a live search bar that filters the game cards by name as the user types, using the `input` event and a case-insensitive substring match.

## Video Walkthrough

Here's a walkthrough of implemented features:

<img src='https://www.loom.com/share/30bbba29fb7e410db6a56827639a4d63' title='Video Walkthrough' width='' alt='Video Walkthrough' />


GIF created with loom  
https://www.loom.com/share/30bbba29fb7e410db6a56827639a4d63

## Notes

The main challenge was getting the dynamic rendering and filtering to work together cleanly. Each filter and the search feature reuse the same `addGamesToPage` function, so the container has to be cleared with `deleteChildElements` before re-rendering, otherwise the filtered games stack on top of the ones already displayed instead of replacing them. Making sure the funded/unfunded comparisons used the right operators (`<` for unfunded, `>=` for funded, so games that exactly meet their goal still count as funded) also took some care. One thing to be aware of: sorting for the top two games uses `.sort()`, which reorders the underlying data array in place.

## License

    Copyright 2026

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
