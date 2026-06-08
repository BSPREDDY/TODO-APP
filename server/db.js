const mongoose = require('mongoose')
// const { string } = require('zod')

console.log('MONGO_URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
    .then(() => { console.log('Database connected') })
    .catch((err) => console.log('Error connecting to database:', err))

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})
const todo = mongoose.model('todos', todoSchema);
module.exports = {
    todo
}
