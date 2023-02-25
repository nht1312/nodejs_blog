const path = require('path');
const express = require('express') // add library
const morgan = require('morgan')
const {engine} = require('express-handlebars')
const app = express() // call express
const port = 3000 // set port

//config scss
app.use(express.static(path.join(__dirname, 'public')))
//HTTP Logger
app.use(morgan('combined'))
//template engine
app.engine('hbs', engine({extname:'.hbs'}));
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname, 'resources/views'));

//định nghĩa route
app.get('/', (req, res) => {
  res.render('home');
})
//go to news route
app.get('/news', (req, res) => {
  res.render('news');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})