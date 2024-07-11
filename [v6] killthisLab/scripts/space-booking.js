async function generateSeats(rows, cols, classID){
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

            const seatStatus = document.createElement('div');
            seatStatus.className = 'seat-status';
            seatStatus.textContent = 'Available'; // to configure with corresponding status
            label.appendChild(seatStatus);
            
            const seatNoDiv = document.createElement('div');
            seatNoDiv.className = 'seat-no';
            seatNoDiv.textContent = seatNumber.toString().padStart(2, '0');
            label.appendChild(seatNoDiv);
            
            const nameDiv = document.createElement('div');
            nameDiv.className = 'seat-name';
            const link = document.createElement('a');
            link.href = ``; // to configure, will link user's profile
            link.textContent = 'Name'; // to configure with user's name or anonymous
            nameDiv.appendChild(link);
            label.appendChild(nameDiv);
            
            seatDiv.appendChild(label);
            allSeats.appendChild(seatDiv);
            
            seatNumber++;
            rowDiv.appendChild(seatDiv);
        }
    }   
}

async function selectClass(classID){
    const classresponse = await fetch('/class/classes');
    const labClass = await classresponse.json();  
    //find selected class
    let selectedClass = labClass.find(classData => classData.classID == classID);
    
    if(selectedClass){
        let { rows, cols } = selectedClass;

        generateSeats(rows, cols, classID);
    }
}