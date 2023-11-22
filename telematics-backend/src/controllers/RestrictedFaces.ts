import { NextFunction, Request, Response } from "express";
import { appDataSource } from "../data-source";


const getAllRestrictedImages = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
        const results = await appDataSource.getRepository('restricted_embeddings')
            .query('SELECT * FROM restricted_embeddings ORDER BY processed_time DESC;');
  
      if (!results) {
        return res.json({ Bool: false, message: 'Images not found' });
      }
  
      return res.json({ Bool: true, data: results });
  
    } catch (e) {
      console.error(e);
      return res.status(500).json({ Bool: false, message: "Internal server error" });
    }
  };

  const removeFace = async (req: Request, res: Response, next: NextFunction)=> {

    try{
       const { id }: any = req.params;

       const results = await appDataSource.getRepository('restricted_embeddings')
       .query(`SELECT * FROM restricted_embeddings WHERE id=${id};`);

       if(results){
            await appDataSource.getRepository('restricted_embeddings').
              query(`DELETE FROM restricted_embeddings WHERE id=${id};`)
            return res.json({ Bool: true, message: 'Face deleted' });
       }
       else{
            return res.json({ Bool: false, message: 'No Face Found' });
       }
        
    }catch (e) {
    console.error(e);
    return res.status(500).json({ Bool: false, message: "Internal server error" });
  }

}



  export const restrictedImageController = {
    getAllRestrictedImages,
    removeFace
  }