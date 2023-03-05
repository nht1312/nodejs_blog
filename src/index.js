const path = require('path');
var methodOverride = require('method-override')
const express = require('express') // add library
const morgan = require('morgan')
const {engine} = require('express-handlebars')
const SortMiddleware = require('./app/middlewares/SortMiddleware')
const app = express() // call express
const port = 3000 // set port
const route = require('./routes')
const db = require('./config/db')
//connect to db
db.connect();

app.use(methodOverride('_method'))
//custom middleware
app.use(SortMiddleware)

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
    sum: (a, b) => a + b,
    sortable: (field, sort) => {
      const sortType = field === sort.column ? sort.type : 'default'
      const icons = {
        default: 'oi oi-evelator',
        asc: 'oi oi-sort-ascending',
        desc: 'oi oi-sort-descending',
      };
      const types = {
        default: 'desc',
        asc:'desc',
        desc:'asc',
      };
      const icon = icons[sortType]
      const type = types[sortType]

      return `<a href="?_sort&column=${field}&type=${type}">
        <span class="${icon}"></span>
      </a>`;
    }
  }
}));
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname, 'resources','views'));

//routes init 
route(app)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})  