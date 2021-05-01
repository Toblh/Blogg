const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()
const port = process.env.PORT || 3000
require('dotenv').config()


mongoose.connect('mongodb+srv://1:1234@cluster0.h7mkj.mongodb.net/Blogg?retryWrites=true&w=majority', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.set('view engine', 'ejs')
app.engine('ejs', require('ejs').__express);
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (_req, res) => {
    const articles = await Article.find().sort({
    createdAt: 'desc' })
    res.render('articles/index', { articles: articles })
})


app.use('/articles', articleRouter)

app.listen(port, function() {
    console.log('Our app is running on http://localhost/:' + port)
}) 
