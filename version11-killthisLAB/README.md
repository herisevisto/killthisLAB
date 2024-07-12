# Kill This Lab | Lab Reservation System

The repository contains the source code for the lab reservation system web application.
The application allows users to reserve seats in different laboratories based on availability.

# Prerequisites:
Before running the application, ensure that the following are installed
- node.js
- npm

## Getting Started:
Initialize the project
- npm init -y
### Install packages
npm install 
- express
- express-fileupload
- hbs
- mongoose
- bcrypt
- passport

## Running the application:
- cd [FILE_LOCATION where index.js is located at your PC]
e.g. cd "C:\Users\ashle\Downloads\killthisLAB-main\killthisLAB-main\version11-killthisLAB"
- node index.js
- on web browser type: localhost:3000


## MongoDB Configuration
   - Ensure MongoDB is running locally:
         mongodb://localhost:27017/killthislab

   - Upload the `.csv` files and `killthislab.locations.json` to the `killthislab/locations` collection.

## Limitations
- Runs on localhost.
- User Sign In and Register functionality captures user registration, but it does not immediately reflect in 
  the database.
