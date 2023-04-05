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
        let targetTextArray = $(e.target).text().split('');
        let targetText = targetTextArray.slice(0, targetTextArray.length - 4).join('');

        let foundTask = workDayArray.map(e => e.task).indexOf(targetText);

        workDayArray.splice(foundTask, 1);

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

            let editBtn = $('<button>', { class: 'btn btn-dark ms-2', id: `edit-${time}`});
            $(editBtn).text('Edit');
            $(newTaskLi).append(editBtn)

            $(timeUl).append(newTaskLi);
        };
    };
};

const displayNewData = (task, time) => {
    let timeUl = $(`#tasks-${time}`);

    let newTaskLi = $('<li>', { class: 'task p-2' });
    $(newTaskLi).text(task);

    let editBtn = $('<button>', { class: 'btn btn-dark ms-2', id: `edit-${time}`});
    $(editBtn).text('Edit');
    $(newTaskLi).append(editBtn)

    $(timeUl).append(newTaskLi);
};

const editBtnHandler = (e) => {
    let target = e.target;
    let parent = $(target).parent();

    if ($(target).is('button')) {
        if ($(target).attr('id').indexOf('edit') >= 0) {
            let textArray = parent.text().split('');
            let taskText = textArray.slice(0, textArray.length - 4).join('');
            let taskTime = parseInt($(target).attr('id').split('-')[1]);

            let foundTask = workDayArray.map(el => el.task).indexOf(taskText);

            if (foundTask && workDayArray[foundTask].time === taskTime) {
                workDayArray.splice(foundTask, 1);

                localStorage.setItem('data', JSON.stringify(workDayArray));
            }

            parent.replaceWith(`<textarea>${taskText}</textarea><button class='btn btn-dark ms-2' id='done'>Done</button>`);
        };
    };
};

const updateTask = (e) => {
    let target = e.target;

    if ($(target).is('button')) {
        if($(target).attr('id') === 'done') {
            let time = parseInt($(target).parent().attr('id').split('-')[1]);
            let newText = $(target).prev().val();

            $(target).parent().empty();

            let newObj = {task: newText, time: time};

            workDayArray.push(newObj);
            localStorage.setItem('data', JSON.stringify(workDayArray));

            location.reload();
        }
    }
}

$(form).on('submit', formSubmissionHandler);
$(body).on('click', deleteTaskHandler);
$(body).on('click', editBtnHandler);
$(body).on('click', updateTask);

displayData(workDayArray);