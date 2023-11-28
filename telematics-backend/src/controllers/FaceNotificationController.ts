import { NextFunction, Request, Response } from "express";
import { FaceNotificationHistory } from "../entities/FaceNotificationHistory";
import { appDataSource } from "../data-source";


const addNotificationFace = async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.body)
    try {
      const {
        name,
        embedding,
        processed_time,
        is_detected,
        detected_frame,
        detected_timestamp,
        status
      } = req.body;
  
      const history = appDataSource.getRepository(FaceNotificationHistory).create({
        name,
        embedding,
        processed_time,
        is_detected,
        detected_frame,
        detected_timestamp,
        status
      });
  
      await appDataSource.getRepository(FaceNotificationHistory).save(history);
  
      return res.json({ Bool: true, data: history });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ Bool: false, message: "Internal server error" });
    }
};

const getAllFaceNotifications = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const notification = await appDataSource.getRepository(FaceNotificationHistory).find();
  
      if (!notification) {
        return res.json({ Bool: false, message: 'Notification not found' });
      }
  
      return res.json({ Bool: true, data: notification });
  
    } catch (e) {
      console.error(e);
      return res.status(500).json({ Bool: false, message: "Internal server error" });
    }
  };


export const FaceNotificationController = {
    addNotificationFace,
    getAllFaceNotifications
}