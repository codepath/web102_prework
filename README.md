# WEB102 Prework - *Game Card Funding*

Submitted by: **Orgito Vuktilaj**

**Game Card Funding** is a website for the company Sea Monster Crowdfunding that displays information about the games they have funded.

Time spent: **6-7** hours spent in total (I'm not actually sure, I didn't keep track)

## Required Features

The following **required** functionality is completed:

* [x] The introduction section explains the background of the company and how many games remain unfunded.
* [x] The Stats section includes information about the total contributions and dollars raised as well as the top two most funded games.
* [x] The Our Games section initially displays all games funded by Sea Monster Crowdfunding
* [x] The Our Games section has three buttons that allow the user to display only unfunded games, only funded games, or all games.

The following **optional** features are implemented:

* [x] Extra functions that store values, eliminating the need for complex functions to be executed repeatedly for the same data to show.
* [x] Changed background color to more deep-sea vibe because that's where sea monsters usually are.
* [ ] Unfunded Filter uses whole 1st row and leaves second to be uneven. Add a function to sort this out. I'd like to learn how to do this properly.

## Video Walkthrough

Here's a walkthrough of implemented features:

<img src='assets/2025-05-01 23-19-00.mp4' title='Video Walkthrough' width='' alt='Video Walkthrough' />

Video Created with OBS.

## Notes

Describe any challenges encountered while building the app.

1. Most of my issues arised when trying to understand the way certain functions worked and how they were to be implemented (for example the .filter() and .reduce() functions).
    a. Simple googles and questions to ChatGPT helped me get past this obstacle.
2. Displaying funding information in the description-container was difficult because:
    a. I needed to figure out a simple (to me) way to correct the grammar based on the numbers that were showing.
        a1. I set a default value for the variables and appended strings to them according to the number of funded/unfunded games that were on record.
    b. Because the filterUnfundedOnly() function would only execute once the respective button was clicked, the funding information would say there were 0 unfunded games.
        b1. I made the text pop up only once one of the filter buttons were clicked.
        b2. I saved the numbers to a global variable so that the function wouldn't NEED to be executed each time (meaning the number was only retrieved once because it still does execute each time you activate the filters).
3. Completely new to using GitHub/Bash functionalities and the link on the prework document no longer functioned.
    a. I used a different online tutorial to teach me the basics of GitHub and GitBash. I already had GitBash installed from trying it other times and I got the hang of it fairly quickly.

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
