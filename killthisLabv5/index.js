const express = require("express");
const app = express();
const path = require('path');
const PORT = 3000;
const fs = require('fs');
const hbs = require('hbs');

app.use(express.json())

// Serve static files
app.use('/styles', express.static(path.join(__dirname, './public/styles')));
app.use('/images', express.static(path.join(__dirname, './public/images')));

/* Define routes */
//Directory route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './views/main/index.html'));
});

const mainRoute =  require("./routes/main");
const homeRoute =  require("./routes/home");
const overlayRoute =  require("./routes/overlay");
const scriptRoute =  require("./routes/script");
const locationRoute = require("./routes/locationRts");
const classRoute = require("./routes/classRts");
const seatRoute = require("./routes/seatRts");

app.use('/main', mainRoute);
app.use('/home', homeRoute);
app.use('/overlay', overlayRoute);
app.use('/script', scriptRoute);
app.use('/location', locationRoute);
app.use('/class', classRoute);
app.use('/seat', classRoute);

// Create mongodb connection (not yet implemented)
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/killthislab')

// Set view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

/**
 * const classesFilePath = path.resolve(__dirname, './model/classData.json');
app.get('/space-booking',async(req,res) => {
    const selectedClassID = req.query.classID;
    const seats = await getAllSeats( parseInt(selectedClassID, 10));
    
    try {
        const classesData = JSON.parse(fs.readFileSync(classesFilePath, 'utf8'));
        const selectedClass = classesData.find(cls => cls.classID == selectedClassID);

        if (!selectedClass) {
            throw new Error(`Class with ID ${selectedClassID} not found.`);
        }

        //console.log('Selected Class:', selectedClass);
        res.render('home/space-booking', { selectedClass, seats });
    } catch (error) {
        console.error('Error:', error.message);
    }
})

const seatsFilePath = path.resolve(__dirname, './model/seats.json');
async function getAllSeats(classID){
    try{
        const seatsData = JSON.parse(fs.readFileSync(seatsFilePath, 'utf8'));
        const seatsForClass = seatsData.filter(sts => sts.classID === classID);
        //console.log("Seats",seatsForClass);
        return seatsForClass;
    } catch(error){
        console.error('Error reading seats.json:', error.message);
    }
}   

 */
hbs.registerHelper('json', function(context) {
    return JSON.stringify(context);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});