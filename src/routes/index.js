const newsRouter = require('./news')
const siteRouter = require('./site')


function route(app){
    
    //go to news route
    app.use('/news', newsRouter)
    //go to search route

    //home route
    app.use('/', siteRouter)

}

module.exports = route