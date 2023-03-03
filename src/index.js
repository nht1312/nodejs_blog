const path = require('path');
var methodOverride = require('method-override')
const express = require('express') // add library
const morgan = require('morgan')
const {engine} = require('express-handlebars')
const app = express() // call express
const port = 3000 // set port
const route = require('./routes')
const db = require('./config/db')
//connect to db
db.connect();

app.use(methodOverride('_method'))


//config scss
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())
//method put 
//HTTP Logger
app.use(morgan('combined'))
//template engine
app.engine('hbs', engine({
  extname:'.hbs',
  helpers: {
    sum: (a, b) => a + b
  }
}));
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname, 'resources','views'));

//routes init 
route(app)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})  