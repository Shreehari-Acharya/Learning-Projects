
// Declare constants wich will contain svg code for delete button and edit button
const SVG_DONE = `<svg class="doneBtn" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="9" fill="none" stroke-width="1.5" /></svg>`
const SVG_EDIT = `<svg class="editBtn" xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24"><path d="M19.769 9.923l-12.642 12.639-7.127 1.438 1.438-7.128 12.641-12.64 5.69 5.691zm1.414-1.414l2.817-2.82-5.691-5.689-2.816 2.817 5.69 5.692z" /></svg>`


const taskContainerDiv = document.querySelector('.task-container'); // The main div in which all the task div's are stored


// A function to manipulate the DOM to add a task given its id and description
function renderTask(taskID,taskDescription){

    const taskdiv = document.createElement('div'); //Create a div

        //give it corresponding id and className
        taskdiv.id = taskID;
        taskdiv.className = 'task-box';

        //Append the HTML code inside the div
        taskdiv.innerHTML = `                   
        ${SVG_DONE}

        <div class="task-description">
            ${taskDescription}
        </div>

        ${SVG_EDIT}
        `
        //append this new div to the root div aka (taskContainerDIv)
        taskContainerDiv.appendChild(taskdiv);
}

// A function to add a new task by sending it to backend and then manipulating DOM by renderTask() function
 async function addTask() {

    //get the input value from the input field.
    const inputfield = document.querySelector('.input-box');
    const taskDescription = inputfield.value.trim();

    //check if its a empty task. If it is, then alert.
    if(!taskDescription){
        alert("Task cannot be empty");
        return;
    }

    try {
        //Send the new task  to the  backend
        const response = await fetch('/api/addTask' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description: taskDescription })
        });

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        //Use the taskid sent by the backend to render it in frontend
        const taskID = data.taskID;

        renderTask(taskID,taskDescription);
        inputfield.value = ""; // clear the input box after adding the task.


    } catch (error) {
        if (error instanceof SyntaxError) {
            console.error('There was a problem parsing the JSON:', error);
        } else if (error instanceof TypeError) {
            console.error('There was a network error:', error);
        } else {
            console.error('There was a problem with the fetch operation:', error.message);
        }
    }
    
}

// A function to delete task from the backend and then in frontend using .remove() function
async function deleteTask(id){

    //get the div of the particular task with its id.
    const taskdiv = taskContainerDiv.querySelector(`#${id}`);

    try {
        //call delete method and pass the id value to delete it from the backend
        const response = await fetch(`/api/tasks/${id}` , {
            method: 'DELETE'
        });

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // delete from the frontend aswell
        taskdiv.remove();

    } catch (error) {
        if (error instanceof SyntaxError) {
            console.error('There was a problem parsing the JSON:', error);
        } else if (error instanceof TypeError) {
            console.error('There was a network error:', error);
        } else {
            console.error('There was a problem with the fetch operation:', error.message);
        }
    }
}

// A function to update the task, send the updated description to backend. 
async function updateTask(ID,updatedDescription) {

    try {
        //call the api with corresponding id and new description.
        const response = await fetch(`/api/tasks/${ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newDescription: updatedDescription })
        });

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        if (error instanceof SyntaxError) {
            console.error('There was a problem parsing the JSON:', error);
        } else if (error instanceof TypeError) {
            console.error('There was a network error:', error);
        } else {
            console.error('There was a problem with the fetch operation:', error.message);
        }
    }
    
}

// A function to get all the tasks from the backend and render all using the render() function
async function readTask() {

    taskContainerDiv.innerHTML = "";

    //api call to get all the tasks
    const response = await fetch('/all');
    //converting it into json format
    const allTasks = await response.json();

    // A loop to render all tasks into the frontend one by one.
    allTasks.forEach(task => {
        const ID = task.id;
        const Description = task.description;
        renderTask(ID,Description);
    })
}





// functionality to execute addTask() when enter is pressed in input field or + icon is pressed
const addButton = document.querySelector('.addBtn'); 
addButton.addEventListener('click',addTask);

const inputfield = document.querySelector('.input-box');
inputfield.addEventListener('keydown', function(event){
    if(event.key == 'Enter'){
        addTask();
    }
})

// functionality to execute updateTask() or deleteTask() based on clicks inside the task-container

function handleClick(event){

    const editBtn = event.target.closest('.editBtn');
    const doneBtn = event.target.closest('.doneBtn');

    if(editBtn){
        // code to get the task-description and put them inside a input field, so the user can alter it.
        const parentdiv = editBtn.closest('.task-box');
        const descriptionDiv = parentdiv.querySelector('div');
        const prevDescription = descriptionDiv.textContent.trim();
        const taskID = parentdiv.id;
        descriptionDiv.innerHTML = `<input class="updateTask-inputArea" type="text" value="${prevDescription}">`

        const newInputField = descriptionDiv.querySelector('.updateTask-inputArea');
        newInputField.focus();

        // even listener to  update it as soon as user press ENTER
        newInputField.addEventListener('keydown', async function(event){
            if (event.key === 'Enter') {
                const newDescription = newInputField.value.trim();
                try {
                    await updateTask(taskID, newDescription);
                    descriptionDiv.textContent = newDescription;
                } catch (error) {
                    console.error('Failed to update task:', error);
                    descriptionDiv.textContent = prevDescription;
                }
            }
        });
        // event listener to discard changes if user press anywhere outside.
        newInputField.addEventListener('blur', function() {
            descriptionDiv.textContent = prevDescription;
        });
    }
    if(doneBtn){
        // calling the deleteTask when the button is clicked
        const parentElement = doneBtn.closest('.task-box');
        const id = parentElement.id;
        deleteTask(id);
    }
}

//whenever the window loads get all the tasks.
window.onload = readTask;

//whenever a click is listened call the handleClick funtion.
document.querySelector('.task-container').addEventListener('click', handleClick);




