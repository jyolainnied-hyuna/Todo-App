const mongoose = require('mongoose');


//connect to database, this is a promise
mongoose.connect('mongodb://localhost/playground')                 
    .then(() => console.log('Connect to MonoDB..'))
    .catch(err => console.group('Could not connect to MongoDB...',err))


//create document/ table structure in the database
const courseSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minlength: 5,
        maxlength:255
    },
    category:{
        type: String,
        enum: ['web', 'mobile', 'network'],
        required: true
    },
    author: String,
    tags: {
        type: Array,
        validate:{
            isAsync: true,
            validator: function(v, callback) {
                return v && v.length > 0;
            },
            message: 'A course should have at least one tag'
        }
    },
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price:{
        type: Number, 
        required:function(){return this.isPublished;} ,
        min: 10,
        max: 200
    }
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
            author: 'joli',
            tags: ['frontend'],
            category: 'web',
            isPublished: true,
            price:10
        });

    try{
         //async operation
        const result = await course.save();
        console.log(result);
    }
    catch (ex){
        console.log(ex.message);
    }
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
    // const result = await course.save();
    // console.log(result);


//remove document
async function removeCourse(id){
    //const result = await Course.deleteOne({_id:id});

    const course = await Course.findByIdAndRemove(id);

    console.log(course);
}

//removeCourse('5cf808c46f6b2f4aff6a1dea');

createCourse();

