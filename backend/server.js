import express from 'express';
import  products  from './data/products.js';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import orderRoutes from './routes/orderRoutes.js';
import path ,{dirname} from 'path';
const __dirname = path.resolve();
dotenv.config()
const app = express();
app.use(express.json());

connectDB();
app.use(cors());

app.use((req,res,next) => {
    next();
})


app.get('/' , (req,res) => {
    res.send('API is running');
})

app.use(express.static(path.resolve(__dirname, "../frontend/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});
app.use('/api/products' , productRoutes);

app.use('/api/users' , 
userRoutes
)
app.use('/api/orders' , orderRoutes);
app.get('/api/config/paypal' , (req,res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
})
const PORT =  process.env.PORT || 5000;
app.listen(PORT ,() => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})
app.use(errorHandler);
app.use(notFound);
