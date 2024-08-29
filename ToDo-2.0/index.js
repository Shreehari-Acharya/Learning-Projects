const express = require('express')
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const port = 3000

const app = express()
const tasksFile = path.join(__dirname, 'tasks.json');
app.use(bodyParser.json());


app.use(express.static('public'));


function loadTasks() {
    if (fs.existsSync(tasksFile)) {
        const data = fs.readFileSync(tasksFile);
        return JSON.parse(data);
    }
    return [];
}

function saveTasks(tasks) {
    fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
}


// Get all tasks --> READ operation
app.get('/', (req, res) => {
    const tasks = loadTasks();
    res.json(tasks);
});

// Update a task --> UPDATE operation
app.put('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const { newDescription } = req.body;

    // Load current tasks
    const tasks = loadTasks();

    // Find the task
    const task = tasks.find(task => task.id === taskId);
    if(task){
        task.description = newDescription;

        // Save updated tasks back to the file
        saveTasks(tasks);

        // Send a success response
        res.status(200).json({ message: `Task with ID ${taskId} updated successfully.` });
    }
    else{
         // Task not found
         res.status(404).json({ error: `Task with ID ${taskId} not found.` });
    }   
});

// Add a task --> ADD operation
app.post('/api/addTask', (req, res) => {
    const tasks = loadTasks();
    const idValue = "ttd" + Date.now().toString(); // Generate a unique ID
    const newTask = {
        id: idValue,
        description: req.body.description
    };

    tasks.push(newTask);
    saveTasks(tasks);

    res.status(201).json({ taskID: newTask.id }); // Return the new task's ID
});


// Delete a task --> DELETE operation
app.delete('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id // Extract task ID from the URL
    let tasks = loadTasks();

    // Filter out the task with the specified ID
    tasks = tasks.filter(task => task.id !== taskId);

    // Save the updated tasks array
    saveTasks(tasks);
    
    res.status(200).send('Task deleted successfully.'); // Send a success message
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})