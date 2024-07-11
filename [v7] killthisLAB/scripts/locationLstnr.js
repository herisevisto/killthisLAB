function handleOption(selectedOption) {
    const outputElement = document.getElementById('output');

    const optionText = selectedOption.textContent.trim();

    if (optionText === 'Select Location') {
        outputElement.textContent = 'Please select a location.';
    } else if (optionText === 'All Locations') {
        outputElement.textContent = 'Showing all locations.';
    } else {
        outputElement.textContent = `Selected location: ${optionText}`;
    }
}