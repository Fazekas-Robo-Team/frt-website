
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import blogRoutes from "./routes/blogRoutes";
import sequelize from "./config/sequelize";
import authMiddleware from "./middleware/authMiddleware";
import { exec } from "child_process";

dotenv.config();

sequelize
    .sync()
    .then(() => {
        console.log("Connected to the database");
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.use(authMiddleware);

app.use("/users", userRoutes);
app.use("/blog", blogRoutes);

// publish changes
app.post("/publish", (req, res) => {
    frontend_process.kill();
    let publish_process = exec("cd .. && cd frt-frontend && npm run build", (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        if (stderr) {
            console.error(stderr);
            return;
        }
        // Create a new process and run the frontend.
        frontend_process = runFrontend();
        res.status(200).json({ message: "Published" });
    });
});

// auth check
app.post("/auth/check", (req, res) => {
    res.status(200).json({ message: "Authenticated" });
});

let frontend_process = runFrontend();

function runFrontend() {
    let frontend_process = exec("cd .. && cd frt-frontend && node server.js", (err, stdout, stderr) => {
        if (stderr) {
            console.error(stderr);
            return;
        }
    });
    return frontend_process;
}
