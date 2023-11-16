import { NextFunction, Request, Response } from "express";
import { appDataSource } from "../data-source";


const getAllFiles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
        const results = await appDataSource.getRepository('file_entry')
            .query('SELECT * FROM file_entry ORDER BY input_date, input_timestamp DESC;');
  
      if (!results) {
        return res.json({ Bool: false, message: 'Files not found' });
      }
  
      return res.json({ Bool: true, data: results });
  
    } catch (e) {
      console.error(e);
      return res.status(500).json({ Bool: false, message: "Internal server error" });
    }
  };


  export const fileEntryController = {
    getAllFiles,
  }