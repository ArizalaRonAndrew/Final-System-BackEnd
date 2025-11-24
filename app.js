import express from "express";
import cors from 'cors';
import 'dotenv/config.js';
import adminRouter from "./src/routes/admin.routes.js";
import BookingRouter from "./src/routes/booking.routes.js";
import studentIdRouter from "./src/routes/studentId.routes.js";

const app = express();
const PORT = process.env.PORT;
app.use(express.json());


const allowedOrigins = [
    "http://localhost:5000",
    "http://127.0.0.1:5500"
]

app.use(
        cors({
            origin: (origin, callback) => {
                if (!origin || allowedOrigins.includes(origin)) {
                    callback(null, true);
                } else {
                    callback(new Error("not allowed by CORS"));
                }
            },
             
            methods: 'GET, POST, PUT, DELETE', 
            allowedHeaders: ['Content-Type', 'Authorization']
        })
    )

// const corsOptions = {
//     origin: process.env.ORIGIN, 
//     methods: 'GET, POST, PUT, DELETE', 
//     allowedHeaders: ['Content-Type', 'Authorization']
// };

// app.use(cors(corsOptions));


app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})


app.use("/api/v1/admin",adminRouter);
app.use("/api/bookings", BookingRouter);
app.use("/api", studentIdRouter);




app.listen(PORT, ()=> {
    try{
        console.log(`Running on http://localhost:${PORT}`);
    } catch (err){
        console.log(err)
    }
})