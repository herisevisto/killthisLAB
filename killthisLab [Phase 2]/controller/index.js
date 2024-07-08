var express = require('express'); 
var app = express();

const path = require('path');
const PORT = 3000;

// Serve static files
app.use('/styles', express.static(path.join(__dirname, '../view/styles')));
app.use('/overlays', express.static(path.join(__dirname, '../view/overlays')));
app.use('/images', express.static(path.join(__dirname, '../view/images')));

/* Define routes */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/main/index.html'));
});

const mainRoute =  require("./routes/main");
const homeRoute =  require("./routes/home");
const overlayRoute =  require("./routes/overlay");
const scriptRoute =  require("./routes/script");

app.use('/main', mainRoute);
app.use('/home', homeRoute);
app.use('/overlay', overlayRoute);
app.use('/script', scriptRoute);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});