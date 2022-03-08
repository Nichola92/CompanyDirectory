const url = 'https://randomuser.me/api?results=12';

//list to store emplyees
var employeesList = [];

//get the gallery element from html code
const gallery = document.querySelector('.gallery');


//fetch data from url
fetch(url)
.then((response) => response.json())
.then((data) => {
    //data.results
    console.log(data.results)
    displayEmployeeGrid(data.results)     
    })       
.catch((error)=>console.log(error));



//method to display all employees in the grid
function displayEmployeeGrid(employeeData)
{
    employeesList = employeeData;
    var employeeGridHTML='';

    // console.log(employeesList[0].name.first)
    // console.log(employeesList[0].picture.large)

    //Add the html code for the 12 employees
    for(var i = 0; i < 12; i++)
    {
        //onClick method is written to open the popup modal
        employeeGridHTML += 
        `<div class="card main-container" onclick=displayModal("${i}")>
            <div class="card-img-container" index="${i}">
                <img class="card-img" src="${employeeData[i].picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employeeData[i].name.first} ${employeeData[i].name.last}</h3>
                <p class="card-text">${employeeData[i].email}</p>
                <p class="card-text cap">${employeeData[i].location.city}, ${employeeData[i].location.state}</p>
            </div>
        </div>`
    }    
        

   //display the above html code in the correct position 
   gallery.insertAdjacentHTML(`afterbegin`,employeeGridHTML) ;
   console.log(document.getElementById("name"));

}


//method to display popup modal
function displayModal(index)
{
    var date = new Date(employeesList[index].dob.date);

    //html code to create the popup modal
    //onclick method is written to close the popup model
    const modalHTML = `
    <div class="modal-container" id="employeeInfo">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn" onclick="closeFunction()"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${employeesList[index].picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${employeesList[index].name.first} ${employeesList[index].name.last}</h3>
            <p class="modal-text">${employeesList[index].email}</p>
            <p class="modal-text cap">${employeesList[index].location.city}</p>
            <hr>
            <p class="modal-text">${employeesList[index].phone}</p>
            <p class="modal-text">${employeesList[index].location.street.number} ${employeesList[index].location.street.name}, 
            ${employeesList[index].location.city},${employeesList[index].location.state} ${employeesList[index].location.postcode}</p>
            <p class="modal-text">Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    </div>`

    //add the above html code in the correct position
    gallery.insertAdjacentHTML(`afterbegin`,modalHTML);
}

//Method to close popup modal
function closeFunction() {
    var x = document.getElementById("employeeInfo");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
}



