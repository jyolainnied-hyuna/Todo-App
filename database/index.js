const mongoose = require('mongoose');


//connect to database, this is a promise
mongoose.connect('mongodb://localhost/playground')                 
    .then(() => console.log('Connect to MonoDB..'))
    .catch(err => console.group('Could not connect to MongoDB...',err))


//create document/ table structure in the database
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});


// Classes, objects

//course class
const Course = mongoose.model('Course', courseSchema);

//create document in database
async function createCourse()
{
    //course object
    const course = new Course(
        {
            name: 'Vue..',
            author: 'Jyolainnie',
            tags: ['vue', 'frontend'],
            isPublished: true
        }
    )

    //async operation
    const result = await course.save();
    console.log(result);

}


//Query database
async function getCourses(){
    
    const courses = await Course
    //.find({author: 'Jyolainnie', isPublished: true})
    .find({price: {$gt : 10}})
    .limit(10)
    .sort({name: 1})
    .select({name: 1, tags: 1})
    console.log(courses);

}


//update document
async function updateCourse(id){
    const course = await Course.findById(id);
    if(!course) return;
    course.isPublished = true;
    course.author = 'Another person';

    const result = await course.save();
    console.log(result);
}

updateCourse('5cf808c46f6b2f4aff6a1dea');

