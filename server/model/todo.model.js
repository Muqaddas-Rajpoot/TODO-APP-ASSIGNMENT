const mongoose=require("mongoose");


const todoSchema = new mongoose.Schema({
    name: { type: String },
   subtasks:[{
    heading : {type:String},
    completed: {type :Boolean}
 }]

});

const Todo = mongoose.model('TodoTask', todoSchema);

module.exports = Todo;