// GENERAL ELEMENTS
const body = $('body');
const form = $('#form');
let yearSpan = $('#year');

// DATA ARRAY
let workDayArray = JSON.parse(localStorage.getItem('data'));
if (workDayArray === null) {
    workDayArray = [];
}

// FORM SUBMISSION HANDLER - CREATE
const formSubmissionHandler = (e) => {
    e.preventDefault();

    // GET FORM INPUT VALUES
    let inputedTask = $('#taskInput').val();
    let inputedTime = $('#input-time').val();

    // CONVERT TIME TO USABLE INT
    let usableTime = parseInt(inputedTime.split(' ')[0]);

    // PUSH TO DATA ARRAY AND SAVE TO LOCAL STORAGE
    let newObj = {task: inputedTask, time: usableTime};
    workDayArray.push(newObj);
    localStorage.setItem('data', JSON.stringify(workDayArray));

    // DISPLAY NEW TASK
    displayNewData(inputedTask, usableTime);

    // RESET FORM VALUES
    $('#taskInput').val('');
    $('#input-time').val('Time');
};

const deleteTaskHandler = (e) => {
    if ($(e.target).is('li')) {
        let targetText = $(e.target).text();

        let foundTask = workDayArray.map(e => e.task).indexOf(targetText);

        workDayArray.splice(foundTask, 1);

        console.log(workDayArray);

        localStorage.setItem('data', JSON.stringify(workDayArray));

        location.reload();
    }
}

// GET DATA AND DISPLAY ON TABLE - READ
const displayData = (data) => {
    if (data.length > 0) {
        for (let i=0; i<data.length; i++) {
            let task = data[i].task;
            let time = data[i].time;
    
            let timeUl = $(`#tasks-${time}`);
            
            let newTaskLi = $('<li>', { class: 'task p-2' });
            $(newTaskLi).text(task);
            $(timeUl).append(newTaskLi);
        };
    };
};

const displayNewData = (task, time) => {
    let timeUl = $(`#tasks-${time}`);

    let newTaskLi = $('<li>', { class: 'task p-2' });
    $(newTaskLi).text(task);
    $(timeUl).append(newTaskLi);
}

$(form).on('submit', formSubmissionHandler);
$(body).on('click', deleteTaskHandler);

displayData(workDayArray);