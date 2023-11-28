import { Router as ExpressRouter } from 'express';
import { IpBlockController } from '../controllers/IpBlockController';
import { UserController } from '../controllers/UserController';
import { LicensePlateController } from '../controllers/LicensePlateController';
import { fileEntryController } from '../controllers/FIleEntryController';
import { RNumberPLateController } from '../controllers/RNumberPlateController';
import { restrictedImageController } from '../controllers/RestrictedFaces';
import { CarNotificationHistoryController } from '../controllers/CarNotificationHistoryController';
import { FaceNotificationController } from '../controllers/FaceNotificationController';

const Router = ExpressRouter();


Router.post('/signup', UserController.create );
Router.post('/signin', UserController.login );

Router.post('/add-api', IpBlockController.addIp );
Router.get('/get-api', IpBlockController.getIp );

Router.post('/add-license-plate', LicensePlateController.addLicensePlate);
Router.get('/get-license-plate', LicensePlateController.getLicensePlate );
Router.get('/get-all-license-plate', LicensePlateController.getAllLicensePlate );

Router.get('/get-unique-license-plate', LicensePlateController.getUniqueLicensePlate );

Router.get('/get-upload-files', fileEntryController.getAllFiles );

Router.get('/get-restricted-number-plate', RNumberPLateController.allNumberPlate );
Router.post('/add-restricted-number-plate', RNumberPLateController.addNumberPlate );
Router.post('/update-restricted-number-plate', RNumberPLateController.updateNumberPlate );
Router.delete('/remove-restricted-number-plate/:id', RNumberPLateController.removeNumberPlate );

Router.get('/get-restricted-images', restrictedImageController.getAllRestrictedImages);
Router.delete('/remove-restricted-image/:id', restrictedImageController.removeFace );
Router.put('/update-detected-face', restrictedImageController.updateFace );


Router.post('/add-car-notifcation', CarNotificationHistoryController.addNotificationHistory );
Router.get('/get-all-car-notifcation', CarNotificationHistoryController.getAllNotifications );

Router.post('/add-face-notifcation', FaceNotificationController.addNotificationFace );
Router.get('/get-all-face-notifcation', FaceNotificationController.getAllFaceNotifications );










export default Router; 