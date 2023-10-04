import { NextFunction, Request, Response } from "express";
import { appDataSource } from "../data-source";
import { IpBlock } from "../entities/IpBlock";


const addIp = async (req: Request, res: Response, next: NextFunction  )=>{

    console.log(req.body)
    try{
        const { ip } = req.body;
        const obj = new IpBlock({
            ip
        });

        await obj.save();

        return res.json({ Bool:true, data: ip });

    }
    catch(e){
        console.log(e)
    }
}


const getIp = async ( req: Request, res: Response, next: NextFunction  )=>{

    console.log(req.query.ip);

    try{
        const ip : any = req.query.ip;
        
        const ipExist = await appDataSource.getRepository(IpBlock).findOneBy({ ip })

        if(!ipExist){
            return res.json({ Bool: false , message: 'Ip is not available' });
        }

        return res.json({ Bool: true , data: ip });

    }
    catch(e){
        console.log(e)
    }
}


export const IpBlockController = {
    addIp,
    getIp
}