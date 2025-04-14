import express from 'express';
import { resetPassword, changePassword, search, favourites, isFavourite, unFavourite, fetch_favourites, notifyEvent } from '../controllers/userController.js'

const router = express.Router();


// reset password
router.post('/reset-password', resetPassword);
// change password
router.post('/change-password', changePassword)
// search
router.post('/search', search);
// favourites
router.post('/fav', favourites);
// check fav
router.get('/isfav/:clubID', isFavourite);
// unfav
router.post('/unfav', unFavourite);
// fetch-favourites
router.get('/fetch-fav', fetch_favourites);
// notify-event
router.post('/notify-event', notifyEvent);

export default router;

