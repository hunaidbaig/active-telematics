import { NextFunction, Request, Response } from "express";
import { appDataSource } from "../data-source";
import { LicensePlate } from "../entities/LicensePlate";

const addLicensePlate = async (req: Request, res: Response, next: NextFunction) => {
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

    const licensePlate = appDataSource.getRepository(LicensePlate).create({
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

    await appDataSource.getRepository(LicensePlate).save(licensePlate);

    return res.json({ Bool: true, data: licensePlate });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ Bool: false, message: "Internal server error" });
  }
};

const getLicensePlate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const idString = req.params.id; 

    const id = parseInt(idString, 10); 

    const licensePlate = await appDataSource.getRepository(LicensePlate).findOneBy({ id });

    if (!licensePlate) {
      return res.json({ Bool: false, message: 'License plate not found' });
    }

    return res.json({ Bool: true, data: licensePlate });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ Bool: false, message: "Internal server error" });
  }
};


const getAllLicensePlate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    const licensePlates = await appDataSource.getRepository(LicensePlate).find();

    if (!licensePlates) {
      return res.json({ Bool: false, message: 'License plate not found' });
    }

    return res.json({ Bool: true, data: licensePlates });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ Bool: false, message: "Internal server error" });
  }
};


export const LicensePlateController = {
  getAllLicensePlate,
  addLicensePlate,
  getLicensePlate,
};
