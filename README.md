# WEB102 Prework - Sea Monster Games

Submitted by: Izayah Rahming

Sea Monster Games is a website for the company Sea Monster Crowdfunding that displays information about the games they have funded.

Time spent: 15 hours spent in total

## Required Features

The following **required** functionality is completed:

* [ ] The introduction section explains the background of the company and how many games remain unfunded.
* [ ] The Stats section includes information about the total contributions and dollars raised as well as the top two most funded games.
* [ ] The Our Games section initially displays all games funded by Sea Monster Crowdfunding
* [ ] The Our Games section has three buttons that allow the user to display only unfunded games, only funded games, or all games.

The following **optional** features are implemented:

* [ ] Added a search bar that allows users to type in a game's name and filter the results instantly.


## Video Walkthrough

### Here's a walkthrough of all the implemented features:

<img src='https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGxjanFjb2JhNGpoOWN0dHMyeHAwZHV2dWx4MXRhaHk0d3pzbGN2aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hLH0GocSVRjnn1x5v4/giphy.gif' title='Video Walkthrough' alt='Video Walkthrough' width='900'/>

<!-- Replace this with whatever GIF tool you used! -->
GIF created with GIPHY
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

One of the main challenges was figuring out how to correctly filter and display only the unfunded games. Initially, I was using the total contributions, but realized I needed to compare the contributions to the game's funding goal. I solved this by creating a function that iterates through the game data and checks if contributions is less than goal. I then used that function to generate the list of unfunded games when the corresponding button was clicked.

This project was a great way to practice using JavaScript array methods like .filter() and .sort(). I used .filter() extensively to separate the games based on their funding status, which was much more efficient than using a traditional for loop. I also spent a lot of time thinking about the application's logic, specifically how to handle the button clicks. I found that using a single function with a conditional if/else statement for each button made the code much cleaner and easier to manage.

## License

    Copyright 2025, Izayah Rahming, inc.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
