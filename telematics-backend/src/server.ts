import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import { appDataSource } from './data-source';
import Router from './routes/Routes';


dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', Router)



app.listen(port, async()=>{
    console.log(`Server running at http://localhost:${port}`);

    try {
        
        appDataSource
        .initialize()
        .then(() => {
            // here you can start to work with your database
            console.log('Database connected!');
        })
        .catch((error) => console.log(error))

      } catch (err) {
        console.log(err);
      }


})