import { NextFunction, Request, Response } from "express";
import { appDataSource } from "../data-source";
import bcrypt from 'bcrypt';
import { User } from "../entities/User";


interface UserType{
    username: string;
    email : string;
    number : string;
    password : string;
    key : string
}


const create = async (req: Request, res: Response, next: NextFunction) => {

    const {
        username,
        email,
        number,
        password,
        key
        } : UserType = req.body;
        

        try{
            const emailUser = await appDataSource.getRepository(User).findOneBy({ email })

            if(emailUser){
                return res.json({ Bool: false , message: 'Email is already taken' });
            }

            const user = new User({
                username,
                email,
                number,
                password,
                key
              });           

            await user.save();

            return res.json({ Bool: true , data: user });

        }catch(e){
            console.log(e);
        }
}


const login = async (req: Request, res: Response, next: NextFunction) => {

    const {
        email,
        password,
        } = req.body;

        try{
            const user = await appDataSource.getRepository(User).findOneBy({ email })

            if(!user){next
                return res.json({ Bool: false , message: 'email or password is incorrect' });
            }

            const match = await bcrypt.compare(password, user.password);    

            if(!match){
                return res.json({ Bool: false , message: 'email or password is incorrect' });
            }

            return res.json({ Bool: true , data: user });

        }
        catch(e){
            console.log(e);
        }
}





export const UserController = {
    create,
    login
  };