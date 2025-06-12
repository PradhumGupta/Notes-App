import express from "express";
import 'dotenv/config';
import methodOverride from 'method-override';
import dashboardRoutes from './server/routes/dashboard.js';
import connectDB from "./server/config/db.js";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import authRoutes from './server/routes/auth.js';
import cors from "cors";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan("dev"))

app.use(cors({
    origin: process.env.FRONTEND_URL ,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
    cookie: {
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// Connect to Database
connectDB();

// Routes
app.use('/', authRoutes);
app.use('/', dashboardRoutes);

app.listen(port, () => {
    console.log(`App listening on ${port}`);
});