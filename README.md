# portfolio
configure nodejs and mongodb

This is my GitHub repo link:

https://github.com/sabamoallem/portfolio

This is the localhost link

 http://localhost:4444/


Below, I will provide step-by-step instructions to set up my web application using MongoDB, Node.js, and Express.js on a Mac. This guide will cover everything from installing necessary software to running the application locally. 
Set Up a Basic Web Application with MongoDB, Node.js, and Express.js
Step 1: Install Homebrew (Package Manager)
Open Terminal
Install Homebrew by running:
	`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/ install.sh)"`
Step 2: Install MongoDB
Install MongoDB using Homebrew:
	`brew tap mongodb/brew`
	`brew install mongodb/brew/mongodb-community`
Start MongoDB service
`brew services start mongodb/brew/mongodb-community`
Step 3: Install Node.js and npm
Install using homebrew:
	`brew install node`
Step 4: Set Up Express.js for Serving the Portfolio
Install Express.js as a dependency:
shell
`npm install express`
Step 5: install and use mongoDB Driver
Installing
	`npm install mongodb`

Step 6: start running 
	`npm start`
Once it is connected, you will see the terminal say:
DB IS CONNECTED
Listening on PORT 4444
you may then click on this link to take you to the website

http://localhost:4444/

Some helpful videos i used:
https://www.youtube.com/watch?v=s1WQ0eEpqqg&ab_channel=HiteshChoudhary
https://www.youtube.com/watch?v=ShAzw-x5GWA&t=104s&ab_channel=DavidHays
https://www.youtube.com/watch?v=R1pu5iwwBFU&ab_channel=MuhammadZeeshanMazhar


