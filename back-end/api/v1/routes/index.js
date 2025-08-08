import express from "express";
import userRoutes from "./user-routes.js";

export const indexRoute = express.Router();
indexRoute.use('/user',userRoutes);
