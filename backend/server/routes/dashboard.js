import express from 'express';
import * as dashboardController from '../controllers/dashboardController.js'
import { isLoggedIn } from '../middleware/checkAuth.js';
const router = express.Router();

/**
 * Dashboard Routes
 */
router.get('/dashboard', isLoggedIn, dashboardController.dashboard);
router.get('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardViewNote);
router.put('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardUpdateNote);
router.delete('/dashboard/item-delete/:id', isLoggedIn, dashboardController.dashboardDeleteNote);
router.post('/dashboard/add', isLoggedIn, dashboardController.dashboardAddNoteSubmit);
router.get('/dashboard/search', isLoggedIn, dashboardController.dashboardSearch);
router.post('/dashboard/search', isLoggedIn, dashboardController.dashboardSearchSubmit);

export default router;