const mongoose = require('mongoose')
// const { string } = require('zod')

mongoose.connect('mongodb+srv://bspreddy:bspreddy%402003@cluster0.dgx863o.mongodb.net/')
const todoSchema = mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean
})
const todo = mongoose.model('todos',todoSchema);
module.exports = {
    todo
}