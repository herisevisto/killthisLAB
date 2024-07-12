async function generateSeats(rows, cols, seats){
    const allSeats = document.querySelector('.all-seats')
    allSeats.innerHTML="";
    let seatNumber =1;
    let rowDiv = null;
    let seatId = seats.seatID;
    let seatIndex = 0;

    for(let i=1;  i<=rows; i++){
        //creates row per (colNo) seats
        rowDiv = document.createElement('div');
        rowDiv.className = 'seat-row';
        allSeats.appendChild(rowDiv);
        for(let j=1; j<=cols; j++){
            const seat = seats[seatIndex]

            const seatDiv = document.createElement('div');
            seatDiv.className = 'seat';
            

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = seat.seatID.toString();
            seatDiv.appendChild(checkbox);

            const seatStatus = document.createElement('div');
            seatStatus.className = 'seat-status';
            seatStatus.textContent = seat.status; // to configure with corresponding status
            
            const label = document.createElement('label');
            label.htmlFor = seat.seatID.toString();
            
            label.appendChild(seatStatus);
            
            const seatNoDiv = document.createElement('div');
            seatNoDiv.className = 'seat-no';
            seatNoDiv.textContent = seatNumber.toString().padStart(2, '0');
            label.appendChild(seatNoDiv);
            
            const nameDiv = document.createElement('div');
            nameDiv.className = 'seat-name';
            const link = document.createElement('a');
            link.href = ``; // to configure, will link user's profile
            link.textContent = seat.name; // to configure with user's name or anonymous
            nameDiv.appendChild(link);
            label.appendChild(nameDiv);
            
            seatDiv.appendChild(label);
            allSeats.appendChild(seatDiv);
            
            seatNumber++;
            rowDiv.appendChild(seatDiv);
            seatIndex++;
        }
    }   

    //Selecting Seats
    const all_seats = document.querySelectorAll('.seat');
    const all_seats_no = document.querySelectorAll('.seat-no');
    all_seats.forEach(seat => {
        const seatStatus = seat.querySelector('.seat-status').textContent;
        if (seatStatus === 'Available') {
            seat.classList.toggle('available');
        } else if (seatStatus === 'Booked') {
            seat.classList.toggle('booked');
        }
        
        seat.addEventListener('click', () => {
            if (!seat.classList.contains('booked')) {
                seat.classList.toggle('selected');
            }
        });
    });

    all_seats_no.forEach(seatNo => {
        seatNo.addEventListener('click', () => {
            const seat = seatNo.closest('.seat');
            if (!seat.classList.contains('booked')) {
                seat.classList.toggle('selected');
            }
        });
    });
    

    /**seats.forEach(seat => {
        const seatCheckbox = document.getElementById(seat.seatID)
        if (seatCheckbox) {
            //seatCheckbox.checked = seat.isBooked;
            seatCheckbox.nextSibling.querySelector('.seat-status').innerHTML = "Hello";
            seatCheckbox.nextSibling.querySelector('.seat-name a').textContent = seat.name;
        }
        else{
            seatCheckbox.nextSibling.querySelector('.seat-status').innerHTML = "Hello";
            seatCheckbox.nextSibling.querySelector('.seat-name a').textContent = seat.name;
        
        }
    }); */
}