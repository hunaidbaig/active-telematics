import { NextFunction, Request, Response } from "express";
import { appDataSource } from "../data-source";
import bcrypt, { compare } from 'bcrypt';
import { User } from "../entities/User";


interface UserType{
    username: string;
    email : string;
    number : string;
    password : string;
    key : string
}


const create = async (req: Request, res: Response, next: NextFunction) => {

    console.log(req.body);

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

            if(number.length !== 11){
                return res.json({ Bool: false , message: 'Your phone number is incorrect' });
            }

            if(password.length < 6 ){
                console.log(password)
                return res.json({ Bool: false , message: 'Password length should be between 6 and 20' });
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

    console.log(req.body)

    const {
        email,
        password,
        } = req.body;

        try{
            const user = await appDataSource.getRepository(User).findOneBy({ email })

            console.log(user)
            if(!user){
                return res.json({ Bool: false , message: 'Email or Password is incorrect' });
            }

            const match = await bcrypt.compare(password, user.password);    

            if(!match){
                return res.json({ Bool: false , message: 'Email or Password is incorrect' });
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