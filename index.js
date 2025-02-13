//connect to MongoDB
const mongoose = require('mongoose');

//to reference the Mongodb installed in my machine and the database I created.
mongoose.connect('mongodb://localhost/mongo-exercises'); 

//Define a Schema for the Documents.
const courseSchema = new mongoose.Schema({
    name: String,
    author: String, 
    tags: [ String ],
    date: Date, 
    isPublished: Boolean,
    price: Number
});

//Compile the schema into a model.
const Course = mongoose.model('Course', courseSchema); //Class Course.

//Query the DB.
async function getCourses(){
    return await Course 
        .find({ isPublished: true, tags: 'backend' })
        .sort({ name: 1 })
        .select({ name: 1, author: 1 });
}
async function run(){
    const courses = await getCourses();
    console.log(courses);
}

run();



