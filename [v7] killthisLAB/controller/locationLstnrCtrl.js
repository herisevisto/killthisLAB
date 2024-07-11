const express = require('express');
const router = express.Router();

router.post('/handleLocationOption', (req, res) => {
    const selectedOption = req.body.selectedOption; // Assuming this is sent from client

    // Example output based on selection
    if (selectedOption === 'Select Location') {
        console.log('Please select a location.');
        res.send('Please select a location.'); // Send a response back to client
    } else if (selectedOption === 'All Locations') {
        console.log('Showing all locations.');
        res.send('Showing all locations.'); // Send a response back to client
    } else {
        console.log(`Selected location: ${selectedOption}`);
        res.send(`Selected location: ${selectedOption}`); // Send a response back to client
    }
});

module.exports = router;
