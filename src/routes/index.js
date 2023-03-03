const newsRouter = require('./news')
const meRouter = require('./me')
const coursesRouter = require('./courses')
const siteRouter = require('./site')



function route(app){
    
    //go to news route
    app.use('/news', newsRouter)
    //go to me route
    app.use('/me', meRouter)
    
    //go to courses route
    app.use('/courses', coursesRouter)

    //home route
    app.use('/', siteRouter)

}

module.exports = route