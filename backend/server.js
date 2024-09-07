//lets use es module of javascript
import express from 'express';
import {connectDB} from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use(express.json());  //allows us to accept JSON data in the request body

app.get('/api/products', async (req,res)=>{
    const product = req.body;  //user provided data
    if(!product.name || !product.price || ! product.image){
        return res.status(400).json({success:false, meassage: "Please Provide all the details."});
    }

    const newProduct = new Product(product);
    try{
        await newProduct.save(); //stored in database
        res.status(201).json({sucess:true, data:newProduct});
    }catch(error){
        console.log(`Error in creating product: ${error.message}`);
        res.status(500).json({success: false, message: "Internal Server error" });
    }
});

const port = 5000;
app.listen(port,()=>{
    connectDB();
    console.log(`Server started at http://localhost:${port}`);
})


//Database password: hK2YXigDK1kjSTJw
//username: meUseprdt
//Atlas connection string(uri):-
//mongodb+srv://meUseprdt:hK2YXigDK1kjSTJw@productcluster.lg60c.mongodb.net/?retryWrites=true&w=majority&appName=productCluster

//mongodb+srv://meUseprdt:<db_password>@productcluster.lg60c.mongodb.net/?retryWrites=true&w=majority&appName=productCluster