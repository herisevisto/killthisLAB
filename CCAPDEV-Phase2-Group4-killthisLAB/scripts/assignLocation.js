async function assignLocations(){
    try{
        const response = await fetch('/location/locations');
        const locations = await response.json();    
        const dropdown = document.getElementById('loc');
        locations.forEach(location => {
        const option = document.createElement('option');
        option.value = location.bldg;
        option.text = location.bldg;
        dropdown.appendChild(option);
        });
    } catch (err){
        console.error('Error fetching locations');
    }
}
