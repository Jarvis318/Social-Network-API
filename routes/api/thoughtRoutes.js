const router = require('express').Router();
const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
} = require('../../controllers/courseController.js');

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
    .route('/:courseId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;
