async function generateSeats(rows, cols, seats) {
    const $allSeats = $('.all-seats');
    $allSeats.empty();
    let seatNumber = 1;
    let seatIndex = 0;
    const urlParams = new URLSearchParams(window.location.search);
    const userID = parseInt(urlParams.get('userID'));
    const classID = parseInt(urlParams.get('classID'));

    for (let i = 1; i <= rows; i++) {
        const $rowDiv = $('<div>').addClass('seat-row');
        $allSeats.append($rowDiv);

        for (let j = 1; j <= cols; j++) {
            const seat = seats[seatIndex];
            const $seatDiv = $('<div>').addClass('seat').attr('id',  `seat-${seat.seatID}`);

            const $checkbox = $('<input>').attr('type', 'checkbox').attr('id',  `checkbox-${seat.seatID}`);
            $seatDiv.append($checkbox);

            const $seatStatus = $('<div>').addClass('seat-status').text(seat.status);
            const $label = $('<label>').attr('for',  `checkbox-${seat.seatID}`);
            const $seatNoDiv = $('<div>')
                .addClass('seat-no')
                .text(seatNumber.toString().padStart(2, '0'))
                .attr('id', `seatno-${seat.seatID}`)
            const $nameDiv = $('<div>').addClass('seat-name');
            const $link = $('<a>').text(seat.name);

            if(seat.name !== 'Anonymous' && seat.name !== 'Name'){
                $link.attr('href', `/home/showProfile?userID=${userID}&viewID=${seat.userID}`)
            }
            else{
                $link.attr('href', '#')
            }
            $nameDiv.append($link);
            $label.append($seatStatus, $seatNoDiv, $nameDiv);
            $seatDiv.append($label);
            $rowDiv.append($seatDiv);

            seatNumber++;
            seatIndex++;
        }
    }

    let selectedSeatID = [];
    

    function toggleSeatID(seatID){
        $(`#seat-${seatID}`).toggleClass('selected');
        
    }

    function updateSeat(){
        $('#seatID').val(selectedSeatID.join(','))
       // $('form').attr('action', `/home/receipt?userID=${userID}&classID=${classID}&seatIDs=${selectedSeatIDs.join(',')}`)

    }

    $('.seat').each(function() {
        const $seat = $(this);
        const seatStatus = $seat.find('.seat-status').text();

        if (seatStatus === 'Available') {
            $seat.addClass('available');
        } else if (seatStatus === 'Booked') {
            $seat.addClass('booked');
        }

        $seat.on('click', function() {
            const seatID = $seat.attr('id').split('-')[1];
            if (!$seat.hasClass('booked')) {
                $seat.toggleClass('selected')
                
                if($seat.hasClass('selected')){
                    selectedSeatID.push(seatID)
                    updateSeat()
                }
            }
        });
    });

    $('.seat-no').each(function() {
        const $seatNo = $(this);

        $seatNo.on('click', function() {
            const $seat = $seatNo.closest('.seat');
            if (!$seat.hasClass('booked')) {
                //$seat.trigger('click')
                $seat.toggleClass('selected');
            }
        });
    });

}

async function adminGenerateSeats(rows, cols, seats) {
    const $allSeats = $('.all-seats');
    $allSeats.empty();
    let seatNumber = 1;
    let seatIndex = 0;
    const urlParams = new URLSearchParams(window.location.search);
    const userIDs = (urlParams.get('userIDs') || '').split(',').map(id => parseInt(id));
    const maxSeats = userIDs.length;

    for (let i = 1; i <= rows; i++) {
        const $rowDiv = $('<div>').addClass('seat-row');
        $allSeats.append($rowDiv);

        for (let j = 1; j <= cols; j++) {
            const seat = seats[seatIndex];
            if (!seat) {
                console.warn('No seat data available for index:', seatIndex);
                continue;
            }

            console.log('Seat:', seat);

            const $seatDiv = $('<div>').addClass('seat').attr('id', `seat-${seat.seatID}`);
            const $checkbox = $('<input>').attr('type', 'checkbox').attr('id', `checkbox-${seat.seatID}`);
            $seatDiv.append($checkbox);

            const $seatStatus = $('<div>').addClass('seat-status').text(seat.status);
            const $label = $('<label>').attr('for', `checkbox-${seat.seatID}`);
            const $seatNoDiv = $('<div>')
                .addClass('seat-no')
                .text(seatNumber.toString().padStart(2, '0'))
                .attr('id', `seatno-${seat.seatID}`);
            const $nameDiv = $('<div>').addClass('seat-name');
            const $link = $('<a>').text(seat.name);

            if (seat.name !== 'Anonymous' && seat.name !== 'Name') {
                $link.attr('href', ``);
            } else {
                $link.attr('href', '#');
            }
            $nameDiv.append($link);
            $label.append($seatStatus, $seatNoDiv, $nameDiv);
            $seatDiv.append($label);
            $rowDiv.append($seatDiv);

            seatNumber++;
            seatIndex++;
        }
    }

    console.log('Seats generated.');

    let selectedSeatID = [];
    
    function toggleSeatID(seatID){
        $(`#seat-${seatID}`).toggleClass('selected');
    }

    function updateSeat(){
        $('#seatID').val(selectedSeatID.join(','));
    }

    $('.seat').each(function() {
        const $seat = $(this);
        const seatStatus = $seat.find('.seat-status').text();

        if (seatStatus === 'Available') {
            $seat.addClass('available');
        } else if (seatStatus === 'Booked') {
            $seat.addClass('booked');
        }
        
        let check = true

        $seat.on('click', function() {
            const seatID = $seat.attr('id').split('-')[1];
            const isSelected = $seat.hasClass('selected');
            if ($seat.hasClass('booked')) {
                return;
            }

            if (isSelected) {
                // Remove the seat ID from the selectedSeatID array
                selectedSeatID = selectedSeatID.filter(id => id !== seatID);
                // Remove the 'selected' class from the seat
                $seat.removeClass('selected');
                check = false
                return;
            } else {
                if(check){
                    // Check if the maximum number of seats has been reached
                    if (selectedSeatID.length < maxSeats) {
                        // Add the seat ID to the selectedSeatID array
                        selectedSeatID.push(seatID);
                        // Add the 'selected' class to the seat
                        $seat.addClass('selected');
                    } else {
                        // Alert if the maximum number of seats is exceeded
                        alert('Max Seats');
                        return; // Exit the function to prevent further processing
                    }
                }
                check = true;
            }
            updateSeat()
            
        });
    });

   $seatNo.on('click', function() {
        const $seat = $seatNo.closest('.seat');
        if (!$seat.hasClass('booked') && check) {
            // Ensure consistency between seat and seat-no click handlers
            if ($seat.hasClass('selected')) {
                selectedSeatID = selectedSeatID.filter(id => id !== $seat.attr('id').split('-')[1]);
            } else {
                if (selectedSeatID.length < maxSeats) {
                    selectedSeatID.push($seat.attr('id').split('-')[1]);
                } else {
                    alert('Max Seats');
                    return;
                }
            }
            $seat.toggleClass('selected');
            updateSeat();
        }
    });
}
