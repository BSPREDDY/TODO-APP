const mongoose = require('mongoose')
// const { string } = require('zod')

mongoose.connect('here give mongoDb connection string')
const todoSchema = mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean
})
const todo = mongoose.model('todos',todoSchema);
module.exports = {
    todo
}
