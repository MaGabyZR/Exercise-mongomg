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
        //.find({ isPublished: true, tags: { $in: [ 'frontend', 'backend' ] } }) //1st solution: get all published frontend and backend courses, use the in comparison operator. 
        //2nd solution: get all published frontend and backend courses, use the or comparison operator.  
        .find({ isPublished: true })
        .or([{ tags: 'frontend'}, { tags: 'backend' } ])
        //.sort({ price: -1 })                               //1st solution sort them by their price in descending order. 
        .sort('-price')                                     //2nd solution to sort them by their price. 
        .select(' name author price');                      //pick only their name and author, and show the price.
}
//Display them on the console.
async function run(){
    const courses = await getCourses();
    console.log(courses);
}

run();