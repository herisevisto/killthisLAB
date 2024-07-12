Kill This Lab | Lab Reservation System

The repository contains the source code for the lab reservation system web application.
The application allows users to reserve seats in different laboratories based on availability.

Prerequisites:
Before running the application, ensure that the following are installed
- node.js
- npm

Getting Started:
Initialize the project
- npm init -y
Install packages
npm install 
- express
- express-fileupload
- hbs
- mongoose
- i --save-dev nodemon // to run with nodemon

Running the application:
- cd [FILE_LOCATION where index.js is located at your PC]
e.g. cd "C:\Users\Downloads\Term 3\APDEV\killthisLab [Phase 1]\view\home"
- node index.js
- on web browser type: localhost:3000

If want to use nodemon (show realtime updates in console when editing files)
- npm run devStart
- nodemon index.js