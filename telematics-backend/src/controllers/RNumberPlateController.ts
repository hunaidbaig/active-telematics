import { NextFunction, Request, Response } from "express";
import { RestrictedNumberPlate } from "../entities/RestrictedNumberPlate";
import { appDataSource } from "../data-source";



const allNumberPlate = async (req: Request, res: Response, next: NextFunction)=> {

    try{
       const licensePlates = await appDataSource.getRepository(RestrictedNumberPlate).find();

         return res.json({ Bool: true, data: licensePlates });
        
    }catch (e) {
    console.error(e);
    return res.status(500).json({ Bool: false, message: "Internal server error" });
  }

}




const addNumberPlate = async (req: Request, res: Response, next: NextFunction)=> {
    console.log(req.body)
    try{
       const { licenseNumber, status } = req.body;

       const licensePlate = await appDataSource.getRepository(RestrictedNumberPlate).create({
           licenseNumber,
           status
         });
     
         await appDataSource.getRepository(RestrictedNumberPlate).save(licensePlate);

         return res.json({ Bool: true, data: licensePlate });
        
    }catch (e) {
    console.error(e);
    return res.status(500).json({ Bool: false, message: "Internal server error" });
  }

}


const updateNumberPlate = async (req: Request, res: Response, next: NextFunction)=> {
  console.log(req.body)
  try{
     const { id,licenseNumber, status } = req.body;

     const obj ={
      id: id,
      licenseNumber: licenseNumber,
      status: status
     }
     const licensePlate = await appDataSource.getRepository(RestrictedNumberPlate).findOneBy({id})
      if(licensePlate){
        await appDataSource.getRepository(RestrictedNumberPlate).save(obj);
      }
      else{
        return res.json({ Bool: false, message: 'not present' });
      }


      return res.json({ Bool: true, data: licensePlate });
      
  }catch (e) {
  console.error(e);
  return res.status(500).json({ Bool: false, message: "Internal server error" });
}

}


const removeNumberPlate = async (req: Request, res: Response, next: NextFunction)=> {

    try{
       const { id }: any = req.params;

       const licensePlate = await appDataSource.getRepository(RestrictedNumberPlate).findOneBy({ id });

       if(licensePlate){
            await appDataSource.getRepository(RestrictedNumberPlate).remove(licensePlate);
            return res.json({ Bool: true, message: 'number plate deleted' });
       }
       else{
            return res.json({ Bool: false, message: 'No numberPlate' });
       }
        
    }catch (e) {
    console.error(e);
    return res.status(500).json({ Bool: false, message: "Internal server error" });
  }

}



export const RNumberPLateController = {
    addNumberPlate,
    removeNumberPlate,
    allNumberPlate,
    updateNumberPlate
}