
// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var rootEl = $('#root');
var hour = $("<p>");
hour.text('9AM')
hour.css('border', 'rgb(122, 242, 242) 5px solid');
rootEl.append(hour);
// current day in header
const currentDay = dayjs().format('MMMM DD, YYYY');
        const headerElement = document.getElementById('currentDay');
        headerElement.textContent = `Today is ${currentDay}.`;
        var today = moment().format("dddd, MMMM Do YYYY ");




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


//make a table tag
// make three trs
//make three ths
//append all three ths to the tr
//append the tr to the table*/