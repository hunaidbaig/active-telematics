import { Router as ExpressRouter } from 'express';
import { IpBlockController } from '../controllers/IpBlockController';
import { UserController } from '../controllers/UserController';
import { LicensePlateController } from '../controllers/LicensePlateController';

const Router = ExpressRouter();


Router.post('/signup', UserController.create );
Router.post('/signin', UserController.login );

Router.post('/add-api', IpBlockController.addIp );
Router.get('/get-api', IpBlockController.getIp );

Router.post('/add-license-plate', LicensePlateController.addLicensePlate);
Router.get('/get-license-plate', LicensePlateController.getLicensePlate );
Router.get('/get-all-license-plate', LicensePlateController.getAllLicensePlate );




export default Router; 