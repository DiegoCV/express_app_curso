import express, { Application, Request, Response } from 'express';
import {urlencoded, json} from 'body-parser';
import dotenv from 'dotenv';
import connectToBD from './db/connection';
import apiV1 from './routes/v1';


dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const PORT = process.env.PORT_API!;

const app:Application = express();
app.use(urlencoded({ extended: false }));
app.use(json());

apiV1(app);

app.use((req:Request, res:Response) => {
    res.status(404).send("NOT FOUND");
});

connectToBD().then((connected:boolean)=>{
    if(connected){
        app.listen(PORT, () => {
            console.log('running on ' + PORT);
        });
    }else{
        console.log("No se pudo conectar a la bd");
    }
})

