const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose'); 
class CourseController{
    //GET /courses/:slug
    show(req, res,next){
        Course.findOne({slug: req.params.slug})
            .then(course => {
                res.render('courses/show', { course: mongooseToObject(course) });
            })
            .catch(next)
    }
    //get /courses/create
    create(req, res,next){
       res.render('courses/create');
    }
    
    //post /courses/store
    store(req, res,next){
        req.body.image = `https://i.ytimg.com/vi/${req.body.videoID}/maxresdefault.jpg`
        const course = new Course(req.body);
        course.save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(error => {

            })
    }
    //get /courses/:id/edit
    edit(req, res,next){
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', { course: mongooseToObject(course) }))
            .catch(next)
    }
    //put /courses/:id
    update(req, res,next){
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }
    //delete /courses/:id
    //1 - soft delete
    delete(req, res,next){
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
    //delete /courses/:id/force
    //2 - delete vinh vien
    forceDelete(req, res,next){
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
    //patch /courses/:id/restore
    restore(req, res,next){
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
    //post /courses/handle-form-actions
    handleFormActions(req, res,next){
        switch(req.body.action){
            case 'delete':
                //xoa tat ca id trong list
                Course.delete({ _id: {$in: req.body.courseIds} })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            default:
                res.json({error: 'Invalid action'});
        }
    }
    //post /courses/handle-form-actions-restore-deleteForce
    handleFormActionsRestoreDeleteForce(req, res,next){
        switch(req.body.action){
            case 'deleteForce':
                //xoa tat ca id trong list vinh vien
                Course.deleteOne({ _id: {$in: req.body.courseIds} })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            case 'restore':
                //khoi phuc tat ca id trong list
                Course.restore({ _id: {$in: req.body.courseIds} })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            default:
                res.json({error: 'Invalid action'});
        }
    }
   
}

module.exports = new CourseController