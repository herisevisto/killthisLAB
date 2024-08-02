async function allocateClass(userID){
    try{
        const response = await fetch('/data/classes');
        
        const labClass = await response.json();    
        const aquariumContainer = document.querySelector('.classrooms');
        
        labClass.forEach(classData => {
            const classElement = document.createElement('div');
            classElement.className = 'aquarium';
            
            const aquariumBg = document.createElement('div');
            aquariumBg.className = 'aquarium-bg';

            const picture = document.createElement('img');
            picture.className = 'result-picture';
            picture.src = '../images/Goks Aquarium.png';
            picture.alt = 'Goks';

            const aquariumBgOverlay = document.createElement('div');
            aquariumBgOverlay.className = 'aquarium-bg-overlay';

            const classNameHeading = document.createElement('h1');
            classNameHeading.textContent = classData.className;
      
            const classInfoParagraph = document.createElement('p');
            classInfoParagraph.textContent = classData.floor + ' Floor | ' + classData.bldg;
      
            const reserveButton = document.createElement('button');
            reserveButton.textContent = 'Reserve Now';
            reserveButton.addEventListener('click', () => {
                window.location.href = `/home/space-booking?classID=${classData.classID}&userID=${userID}`;
            })

            aquariumBgOverlay.appendChild(classNameHeading);
            aquariumBgOverlay.appendChild(classInfoParagraph);
            aquariumBgOverlay.appendChild(reserveButton);

            aquariumBg.appendChild(picture);
            aquariumBg.appendChild(aquariumBgOverlay);
            
            const aquariumDetails = document.createElement('div');
            aquariumDetails.className = 'aquarium-details';

            const createDetailField = (title, value) => {
                const field = document.createElement('div');
                field.className = 'aquarium-field';
        
                const fieldTitle = document.createElement('h1');
                fieldTitle.textContent = title;
        
                const fieldValue = document.createElement('p');
                fieldValue.textContent = value;
        
                field.appendChild(fieldTitle);
                field.appendChild(fieldValue);
        
                return field;
            };

            aquariumDetails.appendChild(createDetailField('Capacity', `${classData.rows * classData.cols} people`));
            aquariumDetails.appendChild(createDetailField('Section', classData.section));
            aquariumDetails.appendChild(createDetailField('Date', new Date(classData.date).toLocaleDateString()));
            aquariumDetails.appendChild(createDetailField('Time', classData.time));
            
            classElement.appendChild(aquariumBg);
            classElement.appendChild(aquariumDetails);

            aquariumContainer.appendChild(classElement);
        });
    } catch (err){
        console.error('Error fetching locations');
    }
}

async function showClass(building, userID){
    try{
        const response = await fetch('/data/classes');
        
        const labClass = await response.json();    
        const aquariumContainer = document.querySelector('.classrooms');
        
        aquariumContainer.innerHTML = ' ';

        labClass.forEach(classData => {
        if(classData.bldg == building){
            const classElement = document.createElement('div');
            classElement.className = 'aquarium';
            
            const aquariumBg = document.createElement('div');
            aquariumBg.className = 'aquarium-bg';

            const picture = document.createElement('img');
            picture.className = 'result-picture';
            picture.src = '../images/Goks Aquarium.png';
            picture.alt = 'Goks';

            const aquariumBgOverlay = document.createElement('div');
            aquariumBgOverlay.className = 'aquarium-bg-overlay';

            const classNameHeading = document.createElement('h1');
            classNameHeading.textContent = classData.className;
      
            const classInfoParagraph = document.createElement('p');
            classInfoParagraph.textContent = classData.floor + ' Floor | ' + classData.bldg;
      
            const reserveButton = document.createElement('button');
            reserveButton.textContent = 'Reserve Now';
            reserveButton.addEventListener('click', () => {
                window.location.href = `/home/space-booking?classID=${classData.classID}&userID=${userID}`;
            })

            aquariumBgOverlay.appendChild(classNameHeading);
            aquariumBgOverlay.appendChild(classInfoParagraph);
            aquariumBgOverlay.appendChild(reserveButton);

            aquariumBg.appendChild(picture);
            aquariumBg.appendChild(aquariumBgOverlay);
            
            const aquariumDetails = document.createElement('div');
            aquariumDetails.className = 'aquarium-details';

            const createDetailField = (title, value) => {
                const field = document.createElement('div');
                field.className = 'aquarium-field';
        
                const fieldTitle = document.createElement('h1');
                fieldTitle.textContent = title;
        
                const fieldValue = document.createElement('p');
                fieldValue.textContent = value;
        
                field.appendChild(fieldTitle);
                field.appendChild(fieldValue);
        
                return field;
            };

            aquariumDetails.appendChild(createDetailField('Capacity', `${classData.rows * classData.cols} people`));
            aquariumDetails.appendChild(createDetailField('Section', classData.section));
            aquariumDetails.appendChild(createDetailField('Date', new Date(classData.date).toLocaleDateString()));
            aquariumDetails.appendChild(createDetailField('Time', classData.time));
            
            classElement.appendChild(aquariumBg);
            classElement.appendChild(aquariumDetails);

            aquariumContainer.appendChild(classElement);
        }
        });
        
        if (building == "All Class"){
            allocateClass(userID);
        }else if (building == "Select Class"){
            aquariumContainer.innerHTML = '<p> Please Select a Class <p>';
        }

    } catch (err){
        console.error('Error fetching locations');
    }
}

function handleLocationChange() {
    let locOption = document.getElementById('loc').value
    let userID = document.getElementById('userID').value
    showClass(locOption, userID);   
}

async function showDate(date, userID){
    try{
        const response = await fetch('/data/classes');
        
        const labClass = await response.json();    
        const aquariumContainer = document.querySelector('.classrooms');
        
        aquariumContainer.innerHTML = ' ';

        labClass.forEach(classData => {
        if(new Date(classData.date).toDateString() === new Date(date).toDateString()){
            const classElement = document.createElement('div');
            classElement.className = 'aquarium';
            
            const aquariumBg = document.createElement('div');
            aquariumBg.className = 'aquarium-bg';

            const picture = document.createElement('img');
            picture.className = 'result-picture';
            picture.src = '../images/Goks Aquarium.png';
            picture.alt = 'Goks';

            const aquariumBgOverlay = document.createElement('div');
            aquariumBgOverlay.className = 'aquarium-bg-overlay';

            const classNameHeading = document.createElement('h1');
            classNameHeading.textContent = classData.className;
      
            const classInfoParagraph = document.createElement('p');
            classInfoParagraph.textContent = classData.floor + ' Floor | ' + classData.bldg;
      
            const reserveButton = document.createElement('button');
            reserveButton.textContent = 'Reserve Now';
            reserveButton.addEventListener('click', () => {
                window.location.href = `/home/space-booking?classID=${classData.classID}&userID=${userID}`;
            })

            aquariumBgOverlay.appendChild(classNameHeading);
            aquariumBgOverlay.appendChild(classInfoParagraph);
            aquariumBgOverlay.appendChild(reserveButton);

            aquariumBg.appendChild(picture);
            aquariumBg.appendChild(aquariumBgOverlay);
            
            const aquariumDetails = document.createElement('div');
            aquariumDetails.className = 'aquarium-details';

            const createDetailField = (title, value) => {
                const field = document.createElement('div');
                field.className = 'aquarium-field';
        
                const fieldTitle = document.createElement('h1');
                fieldTitle.textContent = title;
        
                const fieldValue = document.createElement('p');
                fieldValue.textContent = value;
        
                field.appendChild(fieldTitle);
                field.appendChild(fieldValue);
        
                return field;
            };

            aquariumDetails.appendChild(createDetailField('Capacity', `${classData.rows * classData.cols} people`));
            aquariumDetails.appendChild(createDetailField('Section', classData.section));
            aquariumDetails.appendChild(createDetailField('Date', new Date(classData.date).toLocaleDateString()));
            aquariumDetails.appendChild(createDetailField('Time', classData.time));
            
            classElement.appendChild(aquariumBg);
            classElement.appendChild(aquariumDetails);

            aquariumContainer.appendChild(classElement);
        }
        });
    } catch (err){
        console.error('Error fetching locations');
    }
}

function handleDateChange() {
    let userID = document.getElementById('userID').value
    let dateOption = document.getElementById('datePicker').value;
    showDate(dateOption, userID);   
}

// admin

let students ="";

async function adminAllocateClass(){
    try{
        const response = await fetch('/data/classes');
        
        const labClass = await response.json();    
        const aquariumContainer = document.querySelector('.classrooms');
        
        labClass.forEach(classData => {
            const classElement = document.createElement('div');
            classElement.className = 'aquarium';
            
            const aquariumBg = document.createElement('div');
            aquariumBg.className = 'aquarium-bg';

            const picture = document.createElement('img');
            picture.className = 'result-picture';
            picture.src = '../images/Goks Aquarium.png';
            picture.alt = 'Goks';

            const aquariumBgOverlay = document.createElement('div');
            aquariumBgOverlay.className = 'aquarium-bg-overlay';

            const classNameHeading = document.createElement('h1');
            classNameHeading.textContent = classData.className;
      
            const classInfoParagraph = document.createElement('p');
            classInfoParagraph.textContent = classData.floor + ' Floor | ' + classData.bldg;
      
            const reserveButton = document.createElement('button');
            reserveButton.textContent = 'Reserve Now';
            reserveButton.addEventListener('click', () => {
                if(students == 1 || students == 2)
                window.location.href = `/admin/userData?classID=${classData.classID}&students=${students}`;
                else{
                    const seatNoSelect = document.getElementById('seatNo');
                    seatNoSelect.classList.add('invalid');
                    alert("Please select number of students");
                    return;
                }
            })

            aquariumBgOverlay.appendChild(classNameHeading);
            aquariumBgOverlay.appendChild(classInfoParagraph);
            aquariumBgOverlay.appendChild(reserveButton);

            aquariumBg.appendChild(picture);
            aquariumBg.appendChild(aquariumBgOverlay);
            
            const aquariumDetails = document.createElement('div');
            aquariumDetails.className = 'aquarium-details';

            const createDetailField = (title, value) => {
                const field = document.createElement('div');
                field.className = 'aquarium-field';
        
                const fieldTitle = document.createElement('h1');
                fieldTitle.textContent = title;
        
                const fieldValue = document.createElement('p');
                fieldValue.textContent = value;
        
                field.appendChild(fieldTitle);
                field.appendChild(fieldValue);
        
                return field;
            };

            aquariumDetails.appendChild(createDetailField('Capacity', `${classData.rows * classData.cols} people`));
            aquariumDetails.appendChild(createDetailField('Section', classData.section));
            aquariumDetails.appendChild(createDetailField('Date', new Date(classData.date).toLocaleDateString()));
            aquariumDetails.appendChild(createDetailField('Time', classData.time));
            
            classElement.appendChild(aquariumBg);
            classElement.appendChild(aquariumDetails);

            aquariumContainer.appendChild(classElement);
        });
    } catch (err){
        console.error('Error fetching locations');
    }
}

async function adminClass(building){
    try{
        const response = await fetch('/data/classes');
        
        const labClass = await response.json();    
        const aquariumContainer = document.querySelector('.classrooms');
        
        aquariumContainer.innerHTML = ' ';

        labClass.forEach(classData => {
        if(classData.bldg == building){
            const classElement = document.createElement('div');
            classElement.className = 'aquarium';
            
            const aquariumBg = document.createElement('div');
            aquariumBg.className = 'aquarium-bg';

            const picture = document.createElement('img');
            picture.className = 'result-picture';
            picture.src = '../images/Goks Aquarium.png';
            picture.alt = 'Goks';

            const aquariumBgOverlay = document.createElement('div');
            aquariumBgOverlay.className = 'aquarium-bg-overlay';

            const classNameHeading = document.createElement('h1');
            classNameHeading.textContent = classData.className;
      
            const classInfoParagraph = document.createElement('p');
            classInfoParagraph.textContent = classData.floor + ' Floor | ' + classData.bldg;
      
            const reserveButton = document.createElement('button');
            reserveButton.textContent = 'Reserve Now';
            reserveButton.addEventListener('click', () => {
                if(students == 1 || students == 2){
                    window.location.href = `/admin/userData?classID=${classData.classID}&students=${students}`;
                }
                else{
                    const seatNoSelect = document.getElementById('seatNo');
                    seatNoSelect.classList.add('invalid');
                    alert("Please select number of students");
                    return;
                }
            })

            aquariumBgOverlay.appendChild(classNameHeading);
            aquariumBgOverlay.appendChild(classInfoParagraph);
            aquariumBgOverlay.appendChild(reserveButton);

            aquariumBg.appendChild(picture);
            aquariumBg.appendChild(aquariumBgOverlay);
            
            const aquariumDetails = document.createElement('div');
            aquariumDetails.className = 'aquarium-details';

            const createDetailField = (title, value) => {
                const field = document.createElement('div');
                field.className = 'aquarium-field';
        
                const fieldTitle = document.createElement('h1');
                fieldTitle.textContent = title;
        
                const fieldValue = document.createElement('p');
                fieldValue.textContent = value;
        
                field.appendChild(fieldTitle);
                field.appendChild(fieldValue);
        
                return field;
            };

            aquariumDetails.appendChild(createDetailField('Capacity', `${classData.rows * classData.cols} people`));
            aquariumDetails.appendChild(createDetailField('Section', classData.section));
            aquariumDetails.appendChild(createDetailField('Date', new Date(classData.date).toLocaleDateString()));
            aquariumDetails.appendChild(createDetailField('Time', classData.time));
            
            classElement.appendChild(aquariumBg);
            classElement.appendChild(aquariumDetails);

            aquariumContainer.appendChild(classElement);
        }
        });
        
        if (building == "All Class"){
            adminAllocateClass();
        }else if (building == "Select Class"){
            aquariumContainer.innerHTML = '<p> Please Select a Class <p>';
        }

    } catch (err){
        console.error('Error fetching locations');
    }
}

async function adminDate(date){
    try{
        const response = await fetch('/data/classes');
        
        const labClass = await response.json();    
        const aquariumContainer = document.querySelector('.classrooms');
        
        aquariumContainer.innerHTML = ' ';

        labClass.forEach(classData => {
        if(new Date(classData.date).toDateString() === new Date(date).toDateString()){
            const classElement = document.createElement('div');
            classElement.className = 'aquarium';
            
            const aquariumBg = document.createElement('div');
            aquariumBg.className = 'aquarium-bg';

            const picture = document.createElement('img');
            picture.className = 'result-picture';
            picture.src = '../images/Goks Aquarium.png';
            picture.alt = 'Goks';

            const aquariumBgOverlay = document.createElement('div');
            aquariumBgOverlay.className = 'aquarium-bg-overlay';

            const classNameHeading = document.createElement('h1');
            classNameHeading.textContent = classData.className;
      
            const classInfoParagraph = document.createElement('p');
            classInfoParagraph.textContent = classData.floor + ' Floor | ' + classData.bldg;
      
            const reserveButton = document.createElement('button');
            reserveButton.textContent = 'Reserve Now';
            reserveButton.addEventListener('click', () => {
                if(students == 1 || students == 2){
                    window.location.href = `/admin/userData?classID=${classData.classID}&students=${students}`;
                }
                else{
                    const seatNoSelect = document.getElementById('seatNo');
                    seatNoSelect.classList.add('invalid');
                    alert("Please select number of students");
                    return;
                }
            })

            aquariumBgOverlay.appendChild(classNameHeading);
            aquariumBgOverlay.appendChild(classInfoParagraph);
            aquariumBgOverlay.appendChild(reserveButton);

            aquariumBg.appendChild(picture);
            aquariumBg.appendChild(aquariumBgOverlay);
            
            const aquariumDetails = document.createElement('div');
            aquariumDetails.className = 'aquarium-details';

            const createDetailField = (title, value) => {
                const field = document.createElement('div');
                field.className = 'aquarium-field';
        
                const fieldTitle = document.createElement('h1');
                fieldTitle.textContent = title;
        
                const fieldValue = document.createElement('p');
                fieldValue.textContent = value;
        
                field.appendChild(fieldTitle);
                field.appendChild(fieldValue);
        
                return field;
            };

            aquariumDetails.appendChild(createDetailField('Capacity', `${classData.rows * classData.cols} people`));
            aquariumDetails.appendChild(createDetailField('Section', classData.section));
            aquariumDetails.appendChild(createDetailField('Date', new Date(classData.date).toLocaleDateString()));
            aquariumDetails.appendChild(createDetailField('Time', classData.time));
            
            classElement.appendChild(aquariumBg);
            classElement.appendChild(aquariumDetails);

            aquariumContainer.appendChild(classElement);
        }
        });
    } catch (err){
        console.error('Error fetching locations');
    }
}

let admin = 0;

function adminLocationChange() {
    let locOption = document.getElementById('loc').value
    let studentVal = document.getElementById('seatNo').value
    students = studentVal
    adminClass(locOption)  
}

function adminDateChange() {
    let dateOption = document.getElementById('datePicker').value;
    let studentVal = document.getElementById('seatNo').value
    students = studentVal
    adminDate(dateOption)  
}

function seatChange(){
    const seatNo = document.getElementById('seatNo').value;
    const seatNoSelect = document.getElementById('seatNo');
    students = seatNo;                
    if(seatNo == 1 || seatNo ==2){
        seatNoSelect.classList.remove('invalid');
        if(admin==1)
            adminLocationChange()
        else if(admin==2)
            adminDateChange()
    }
    else{
        seatNoSelect.classList.add('invalid');
        alert("Select Valid Seat")
    }
}

document.getElementById('seatNo').addEventListener('change', () => {
    let studentVal = document.getElementById('seatNo').value;
    students = studentVal;
    seatChange();
});

document.getElementById('loc').addEventListener('change', () => {
    admin = 1;
    seatChange();
});

document.getElementById('datePicker').addEventListener('change', () => {
    admin = 2;
    seatChange();
});