import { NextFunction, Request, Response } from "express";
import { appDataSource } from "../data-source";
import { CarNotificationHistory } from "../entities/CarNotificationHistory";


const addNotificationHistory = async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.body)
    try {
      const {
        frameNo,
        carId,
        carBbox,
        licensePlateBbox,
        licensePlateBboxScore,
        licenseNumber,
        licenseNumberScore,
        processedTime,
        image,
        latitude,
        longitude
      } = req.body;
  
      const history = appDataSource.getRepository(CarNotificationHistory).create({
        frameNo,
        carId,
        carBbox,
        licensePlateBbox,
        licensePlateBboxScore,
        licenseNumber,
        licenseNumberScore,
        processedTime,
        image,
        latitude,
        longitude
      });
  
      await appDataSource.getRepository(CarNotificationHistory).save(history);
  
      return res.json({ Bool: true, data: history });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ Bool: false, message: "Internal server error" });
    }
};

const getAllNotifications = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const notification = await appDataSource.getRepository(CarNotificationHistory).find();
  
      if (!notification) {
        return res.json({ Bool: false, message: 'Notification not found' });
      }
  
      return res.json({ Bool: true, data: notification });
  
    } catch (e) {
      console.error(e);
      return res.status(500).json({ Bool: false, message: "Internal server error" });
    }
  };


export const CarNotificationHistoryController = {
    addNotificationHistory,
    getAllNotifications
}