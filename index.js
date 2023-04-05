// GENERAL ELEMENTS
const body = $('body');
const form = $('#form');
let yearSpan = $('#year');

// DATA ARRAY
let workDayArray = [];

// FORM SUBMISSION HANDLER
const formSubmissionHandler = (e) => {
    e.preventDefault();

    // GET FORM INPUT VALUES
    let inputedTask = $('#taskInput').val();
    let inputedTime = $('#input-time').val();

    // CONVERT TIME TO USABLE INT
    let usableTime = parseInt(inputedTime.split(' ')[0]);

    // PUSH TO DATA ARRAY
    let newObj = {task: inputedTask, time: usableTime};
    workDayArray.push(newObj);

    // DISPLAY NEW TASK
    displayData(workDayArray);

    // RESET FORM VALUES
    $('#taskInput').val('');
    $('#input-time').val('Time');
};

// GET DATA AND DISPLAY ON TABLE
const displayData = (data) => {
    for (let i=0; i<data.length; i++) {
        let task = data[i].task;
        let time = data[i].time;

        let timeUl = $(`#tasks-${time}`);
        
        let newTaskLi = $('<li>', { class: 'task p-2' });
        $(newTaskLi).text(task);
        $(timeUl).append(newTaskLi);
    }
}

$(form).on('submit', formSubmissionHandler);