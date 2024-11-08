const express = require('express');

const app = express();

const mongoose = require('./database/mongoose');

const TaskList = require('./database/models/taskList');

const Task = require('./database/models/task');

/*
CROS - Cross Origin Request Security
Backend - http://localhost:3000
Frontend - http://localhost:4200
*/

// Could use 3rd part library, app.use(cors());

// Add Headers

app.use(
    (request, response, next)=> {

        // Website you wish to allow to connect
        response.setHeader('Access-Contol-Allow-Origin', '*');

        // Request methods you wish to allow
        response.setHeader('Access-Contol-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request Headers you wish to allow
        response.setHeader('Access-Contol-Allow-Headers', 'Origin', 'X-Requested-With, Content-Type, Accept');

        // Set to true if you need the website to include cookies in the request sent
        // to the API (e.g. in case you use sessions)
        //response.setHeader('Access-Contol-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    }
);

// Could use 3rd party library, bodyParser

//Example of middleware
app.use(express.json());


// Routes of REST API Endpoints or RESTFul webservices Endpoints
/* 
TaskList - Create, Update, ReadTaskListById, ReadAllTaskList
Task - Create, Update, ReadTaskById, ReadAllTask
*/

// Routes or API endpoints for TaskList models
// Get All Task Lists
// http://localhost:3000/tasklist => [ {TaskList}, {TaskList}]

//app.get('/tasklists', function(req, res){code});
app.get('/tasklists', (request, response)=> {
    TaskList.find({})
        .then((lists) => {
            response.status(200).send(lists);
        })
        .catch((error)=>{
            console.log(error);
            response.status(500);
        });
});

// Endpoint to get one tasklist by tasklistId : http://localhost:3000/tasklists/672cf8a896a60e15e15669eb

app.get('/tasklists/:tasklistId', (request, response)=> {
        let tasklisId = request.params.tasklistId;
        TaskList.find({_id: tasklisId})
            .then((tasklist)=> {
                response.status(200).send(tasklist);
            })
            .catch((error)=> {console.log(error)});
    }
);

// Route or Endpoint for creating a TaskList

app.post('/tasklists', (request, response)=> {
    //console.log("Hello I am inside post method");
    console.log(request.body);

    let taskListObj = { 'title': request.body.title};
    TaskList(taskListObj).save()
        .then((taskList)=>{
            response.status(201).send(taskList);
        })
        .catch((error)=> {
            console.log(error);
            response.status(500);
        });
});
// PUT is full update of object
app.put('/tasklists/:tasklistId', (request, response) => {
    console.log("abc")
   TaskList.findOneAndUpdate({ _id: request.params.tasklistId}, { $set: request.body})
   .then((taskList)=>{
        response.status(200).send(taskList);
    })
    .catch((error)=> {
        console.log(error);
        response.status(500);
    });
});


// PATCH is partial update of object
app.patch('/tasklists/:tasklistId', (request, response) => {
    TaskList.findOneAndUpdate({ _id: request.params.tasklistId}, { $set: request.body})
    .then((taskList)=>{
         response.status(200).send(taskList);
     })
     .catch((error)=> {
         console.log(error);
         response.status(500);
     });
 });


 // Delete a tasklist by id
 app.delete('/tasklists/:tasklistId', (request, response) => {
    TaskList.findByIdAndDelete(request.params.tasklistId)
    .then((taskList)=>{
         response.status(201).send(taskList);
     })
     .catch((error)=> {
         console.log(error);
         response.status(500);
     });
 });


// app.listen(3000, function(){
//     console.log("Server started on port 3000");
// });

app.listen(3000, () => {
    console.log("Server started on port 3000!!");
});