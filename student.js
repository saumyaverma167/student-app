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
    const { name, marks } = req.body;

    // Validate input
    if (!name || marks === undefined) {
        return res.status(400).json({
            error: 'Name and marks are required'
        });
    }

    if (typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({
            error: 'Name must be a non-empty string'
        });
    }

    if (typeof marks !== 'number' || marks < 0 || marks > 100) {
        return res.status(400).json({
            error: 'Marks must be a number between 0 and 100'
        });
    }

    // Generate a unique ID
    const newStudent = {
        id: students.length
            ? Math.max(...students.map(s => s.id)) + 1
            : 1,
        name: name.trim(),
        marks
    };

    students.push(newStudent);

    res.status(201).json({
        message: 'Student added successfully',
        student: newStudent
    });
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