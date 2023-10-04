import { Router as ExpressRouter } from 'express';
import { IpBlockController } from '../controllers/IpBlockController';
import { UserController } from '../controllers/UserController';

const Router = ExpressRouter();


Router.post('/signup', UserController.create );
Router.post('/signin', UserController.login );

Router.post('/add-api', IpBlockController.addIp );
Router.get('/get-api', IpBlockController.getIp );




export default Router; 