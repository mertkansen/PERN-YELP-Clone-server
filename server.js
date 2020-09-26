import express from "express";
import Cors from "cors";
import { router as restaurantRouter } from "./routes/restauRoutes.js";
import morgan from "morgan";
import dot from "dotenv";

// Configuration

dot.config();
const PORT = process.env.PORT || 3333;

const app = express();

// Middleware

app.use(Cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes

app.use("/api/v1/restaurants", restaurantRouter);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
