document.addEventListener("DOMContentLoaded", function() {
    function generateSeats(rows, cols){
        var seatContainer =  document.querySelector(".all-seats");
        seatContainer.innerHTML = " ";
    
        for(let row=1; row<=rows; row++){
            for(let col=1; col<=cols; col++){
                var seatId = `seat${row}-${col}`;
                var seatLabel = `Row ${row}, Seat ${col}`;
    
                var seatCheckbox = document.createElement("input");
                seatCheckbox.type="checkbox";
                seatCheckbox.id=seatId;
                seatCheckbox.className="seat";
    
                var seatCheckboxLabel = document.createElement("label");
                seatCheckboxLabel.setAttribute("for", seatId);
                seatCheckboxLabel.textContent=seatLabel;
    
                seatContainer.appendChild(seatCheckbox);
            }
            seatContainer.appendChild(document.createElement("br"));
        }
    }
    generateSeats(4,8);
})
