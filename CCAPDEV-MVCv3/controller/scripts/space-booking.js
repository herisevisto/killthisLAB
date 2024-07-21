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
