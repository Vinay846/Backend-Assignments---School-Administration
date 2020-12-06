const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const fs = require("fs");
const port = 8080
app.use(express.urlencoded());
const studentArray = require('./InitialData')

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// your code goes here
app.get('/api/student', (req, res)=>{
    res.send(studentArray);
});

app.get('/api/student/:id', (req, res)=>{
    console.log(req.params.id);
    const idToSend = req.params.id;
    studentArray.studentArray.forEach((student)=>{
        if(student.id === Number(idToSend)){
            res.send({
                id: student.id,
                name: student.name,
                currentClass: student.currentClass,
                division: student.division
            })
        }
    });
    res.sendStatus(404);
});

app.post('/api/student', (req, res)=>{

    if(req.body.name.length === 0 || req.body.currentClass.length === 0 || req.body.division.length === 0){
        res.sendStatus(400);
    }
    const currStudent = {
        id: studentArray.studentArray.length+1,
        name: req.body.name,
        currentClass: req.body.currentClass,
        division: req.body.division
    }
    studentArray.push2Arr(currStudent);
    res.send(currStudent);
});

app.put('/api/student/:id', (req, res)=>{
    console.log(req.params.id);
    const idToChange = req.params.id;
    const nameToChange = req.body.name;
    const currentClassToChange = req.body.currentClass;
    const divisionToChange = req.body.division;
    studentArray.studentArray.forEach((student)=>{
        if(student.id === Number(idToChange)){
            console.log("hai tho");
            nameToChange.length > 0 ? student.name = nameToChange:'';
            currentClassToChange.length > 0 ? student.currentClass = currentClassToChange:'';
            divisionToChange.length > 0 ? student.division = divisionToChange:'';
            res.sendStatus(200);
        }
    });
    res.sendStatus(400);
});

app.delete('/api/student/:id', (req, res)=>{
    studentArray.studentArray.forEach((student)=>{
        if(student.id === Number(req.params.id)){
            studentArray.splice2Arr(req.params.id, 1);
            res.sendStatus(200);
        }
    })
    res.sendStatus(404);
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   