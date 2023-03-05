const express = require('express')
const router = express.Router()
const courseController = require('../app/controllers/CourseController')

router.get('/create', courseController.create)
router.post('/store', courseController.store)
router.get('/:id/edit', courseController.edit)
//checkbox delete
router.post('/handle-form-actions', courseController.handleFormActions)
//checkbox restore & deleteForce
router.post('/handle-form-actions-restore-deleteForce', courseController.handleFormActionsRestoreDeleteForce)
router.put('/:id', courseController.update)
router.patch('/:id/restore', courseController.restore)
router.delete('/:id', courseController.delete)
//xoa vinh vien
router.delete('/:id/force', courseController.forceDelete)
router.get('/:slug', courseController.show)


module.exports = router