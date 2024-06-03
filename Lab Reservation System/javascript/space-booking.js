document.addEventListener("DOMContentLoaded", function() {
    const allSeats = document.getElementById('allSeats');
    const seat = document.getElementsByClassName('seat');

    // generate seats based on no of rows and cols
   function generateSeats(rows, cols){
        allSeats.innerHTML=" ";
        let seatNumber =1;
        let rowDiv = null;
        for(let i=1;  i<=rows; i++){
            //creates row per (colNo) seats
            rowDiv = document.createElement('div');
            rowDiv.className = 'seat-row';
            allSeats.appendChild(rowDiv);
            for(let j=1; j<=cols; j++){
                const seatDiv = document.createElement('div');
                seatDiv.className = 'seat';

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = `seat-${seatNumber}`;
                seatDiv.appendChild(checkbox);
                
                const label = document.createElement('label');
                label.htmlFor = `seat-${seatNumber}`;
                
                const seatNoDiv = document.createElement('div');
                seatNoDiv.className = 'seat-no';
                seatNoDiv.textContent = seatNumber.toString().padStart(2, '0');
                label.appendChild(seatNoDiv);
                
                const nameDiv = document.createElement('div');
                nameDiv.className = 'seat-name';
                const link = document.createElement('a');
                link.href = ``; // to configure, will link user's profile
                link.textContent = 'Name';
                nameDiv.appendChild(link);
                label.appendChild(nameDiv);
                
                seatDiv.appendChild(label);
                allSeats.appendChild(seatDiv);
                
                seatNumber++;
                rowDiv.appendChild(seatDiv);
            }
        }
    }
    // Values depends on no of rows and cols
    const seats = generateSeats(4,8);
    
    //Selecting Seats
    const all_seats = document.querySelectorAll('.seat');
    const all_seats_no = document.querySelectorAll('.seat-no');
    all_seats.forEach(seat => {
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
})
