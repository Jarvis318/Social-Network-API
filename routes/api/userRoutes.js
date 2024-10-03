const router = require('express').Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/user/:userId
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

//  /api/users/:userId/friends/:friendId
// router
// .route('/:userId/friends/:friendId').
module.exports = router;
