let id_value = 0;
let count = 0;
const root_div = document.getElementsByClassName("box-for-todo")[0];


function addTask() {

    const inputfield = document.querySelector('.input-area');
    const task = inputfield.value;

    if(task == ""){
        alert("Task cannot be empty :(");
        return;
    }

    if(count == 0){
        const empty = root_div.querySelector('.empty-message');
        if(empty){empty.remove();}
    }

    root_div.insertAdjacentHTML('beforeend', `
        <div id="${id_value}" class="task-div">
            <div class="task-description">
                ${task}
            </div>
            <div class="task-button">
                <button class="task-finish-btn" onclick="deleteTask(this)">Done</button>
            </div>
        </div>
    `);
    count++;
    id_value++;
    inputfield.value = "";
}

function deleteTask(element){
    const parentdiv = element.parentElement.parentElement;
    const id = parentdiv.id;

    const target_div = document.getElementById(id);
    if(target_div){
        target_div.remove();
    }
    count--;
    if(count == 0){
        root_div.innerHTML = `<div class="empty-message">Empty... Add a new task right now!</div>`;
    }
}

