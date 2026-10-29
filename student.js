const express = require('express');
const app = express();
const PORT = 4001;

app.use(express.json());

let students = [
    { id: 1, name: "Aarav", marks: 85},
    { id: 2, name: "Priya", marks: 92},
    { id: 3, name: "Rahul", marks: 78}
];

app.get('/',(req,res) => {
    res.send('Students API is running!');
});

app.get('/students', (req, res) => {
    res.json(students);
});

app.get('/students/:id', (req,res)=> {
    const id = parseInt(req.params.id);
    const student = students.find(s=> s.id == id);

    if(!student) {
        return res.status(404).json ({ error: "Student not found"});
    }
    
    res.json(student);

});

app.post('/students', (req, res) => {
    const newStudent = {
        id : students.length + 1,
        name : req.body.name,
        marks : req.body.marks
    };

    students.push(newStudent);
    res.status(201).json(newStudent);
});

app.put('/students/:id', (req,res)=> {
    const id = parseInt(req.params.id);
    const { name, marks} = req.body;

    const student = students.find(s=> s.id === id);

    if(!student){
        return res.status(404).json({message: 'Student not found'});
    }
 student.name = name;
 student.marks = marks;
 res.json(student);
});

app.patch('/students/:id', (req,res)=> {
    const id = parseInt(req.params.id);
    const student = students.find(s=>s.id===id);

    if(!student){
        return res.status(404).json({message: 'Student not found'});
    }

    if(req.body.name !== undefined){
        student.name = req.body.name;
    }

    if(req.body.marks!== undefined){
        student.marks = req.body.marks;
    }
    res.json(student);
});

app.delete('/students/:id', (req,res)=> {
    const id = parseInt(req.params.id);
    const index = students.findIndex(s=> s.id ===id);

    if(index===-1){
        return res.status(404).json({message: 'Student not found'});
    }

    const deletedStudent = students.splice(index,1)[0];

    res.json({
        message: 'Student deleted',
        deleted: deletedStudent
    });

});

app.listen(PORT, () => {
    console.log('Server running on http://localhost: ${PORT}');
}); 