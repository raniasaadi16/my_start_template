const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();


router.route('/login').post(authController.login); 
router.get('/logout', authController.logout);
router.route('/signup').post(authController.signup);
router.get('/getMe',authController.protect, authController.getMe);
router.patch('/updateMe',authController.protect, authController.updateMe); 
router.delete('/deleteMe',authController.protect, authController.deleteMe);
router.patch('/updatePassword',authController.protect, authController.updatePass); 
router.post('/forgetPassword', authController.forgetPassword);
router.get('/ressetPassword/:token', authController.ressetPasswordGet); 
router.patch('/ressetPassword/:token', authController.ressetPasswordUpdate); 
router.get('/activateAccount/:activeToken', authController.activateAccount);
router.post('/resendEmailToken', authController.resendEmailToken); -
router.patch('/updateEmail',authController.protect, authController.updateEmail); 
router.patch('/confirmNewEmail/:token', authController.confirmNewEmail);

router.route('/isLoggedin').get(authController.isLoggedin, authController.getCurrentUser);





module.exports = router