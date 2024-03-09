var timeDisplayEl = $("#time-display");
var projectDisplayEl = $("project-display");
var projectFormEl = $("project-form");
var projectNameInputEl = $("#project-name-input");
var projectNameTypeEl = $("#project-type-input");
var projectNameDateEl = $("#project-date-input");
// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
// Get all the time-blocks (assuming they have the class "time-block")
const timeBlocks = document.querySelectorAll('#time-block');

// Add a click event listener to each "Save" button
timeBlocks.forEach((block) => {
    const saveButton = block.querySelector('button');
    saveButton.addEventListener('click', saveTask);
});

// Save task description to local storage
function saveTask(event) {
    // Get the input element within the same time-block
    const inputElement = event.target.previousElementSibling;
    const taskDescription = inputElement.value;

    // Get the unique ID (e.g., "hour-9") from the time-block's ID
    const timeBlockId = event.target.parentElement.id;

    // Save the task description using the time-block ID as the key
    localStorage.setItem(timeBlockId, taskDescription);
}

// current day in header
const currentDay = dayjs().format('MMMM DD, YYYY');
        const headerElement = document.getElementById('currentDay');
        headerElement.textContent = `Today is ${currentDay}.`;

       /*
        function saveRow(button) {
            const row = button.closest('tr');
            const time = row.querySelector('td:first-child').textContent;
            const task = row.querySelector('input[type="text"]').value;

            // Save the data (you can use local storage or send it to a server)
            console.log(`Saved: ${time} - ${task}`);
        }

        function deleteRow(button) {
            const row = button.closest('tr');
            row.remove();
        }
        /*
 function saveRow(button) {
     const row = button.closest('tr');
     const name = row.querySelector('input[type="text"]').value;
     const age = row.querySelector('input[type="number"]').value;

     localStorage.setItem('user_name', name);
     localStorage.setItem('user_age', age);

     // Save the data (you can use local storage or send it to a server)
     console.log(`Name: ${name}, Age: ${age}`);
        }
 
        const currentHour = new Date().getHours();
        document.getElementById('currentHour').textContent = currentHour;
//notes below:
/*
//global dom elements
var timeDisplayEl = $("#time-display");
var projectDisplayEl = $("project-display");
var projectFormEl = $("project-form");
var projectNameInputEl = $("#project-name-input");
var projectNameTypeEl = $("#project-type-input");
var projectNameDateEl = $("#project-date-input");

//display the time
function diplayTime() {
    var rightNow  = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
    timeDisplayEl.text(rightNow);
} 

// reads projects from local storage
// returns an empty array if there arent any projects 
function readProjectsFromStorage() {
    var projects = localStorage.getItem('projects');
    if (projects) {
        projects = JSON.parse(projects);
    } else {
        projects = [];
    }
    return projects;
}

//takes an array of projects and saves them in localStorage
function SaveProjectsToStorage(projects) {
localStorage.setItem('projects', JSON.stringify(projects));
}


//gets project data from local storage
function printProjectData() {
//clear current projects
    projectDisplayEl.empty();
//get projects from localStorage
    var projects = readProjectsFromStorage();
    //projects will look like this {[{projectname:name,date:1999},{projectname:name}]}
    // ALWAYS CONSOLE ANYTHING THAT IS CONFUSING
//loop through each project and create a row
for (var i = 0; i < projects.length; i+= 1) {
var project = projects[i];
var projectDate = dayjs(project.date);
// get date/time for start of today
var today = dayjs().startOf('day');
// create row and columns for project
var rowEl = $('<tr>');
var nameEl = $('<td>').text(project.name);
var typeEl = $('<td>').text(project.type);
var dateEl = $('<td>').text(projectDate.format('MM/DD/YYYY'));

// save the index of the project as a data attribute on the button. This will
//be used when removing the project from an array
var deleteEl = $(
'<td><button class="bton btn-sm btn-delete-project" data-index="' + i +
'">X</button></td>'
);

// add calss to row by comparing project date to today's date
if (projectDate.isBefore(today)) {
    rowEl.addClass('project-late');
}else if (projectDate.isSame(today)) {
    rowEl.addClass('project-today');
}
//append elements to DOM to display them
rowEl.append(nameEl, typeEl, dateEl, deleteEl);
projectDisplayEl.append(rowEl);

}}
//removes a project from local storage and prints the project data
function handleDeleteProject() {
    var projectIndex = parseInt($(this).attr('data-index'));
    var projects = readProjectsFromStorage();
    //remove project from the array
    projects.splice(projectIndex, 1);
    SaveProjectsToStorage(projects);

    //print projects
    printProjectData();
}


//add a project to local storage and prints the project data
function handleProjectFormSubmit(event) {
    event.preventDefault();
    // reader user input from the form
    var projectName = projectNameInputEl.val().trim();
    var projectType = projectNameTypeEl.val();
    var projectDate = projectNameDateEl.val();

    var newProject = {
        name: projectName,
        type: projectType,
        date: projectDate,
    };

    //add project to local storage
    var projects = readProjectsFromStorage();
    projects.push(newProject);
    SaveProjectsToStorage(projects);
    // print project data
    printProjectData();
    //clear the form inputs
    projectNameInputEl.val('');
    projectNameTypeEl.val('');
    projectNameDateEl.val('');
}

projectFormEl.on('submit', handleProjectFormSubmit);
// use jquery event delegation to listen for clicks on dynamically added delete
projectDisplayEl.on('click', 'btn-delete-project', handleDeleteProject);

diplayTime();
setInterval(diplayTime, 1000);
printProjectData();

/*
function updatehour() {
const currentTime = dayjs()
const updateTime = currentTime.format('h:mm A')
$('#currentDay').textContent = updateTime;
}
setInterval(updatehour, 1000);

updatehour();
*/

//make a table tag
// make three trs
//make three ths
//append all three ths to the tr
//append the tr to the table