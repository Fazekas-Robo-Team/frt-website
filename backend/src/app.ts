
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import blogRoutes from "./routes/blogRoutes";
import sequelize from "./config/sequelize";
import authMiddleware from "./middleware/authMiddleware";
import { exec } from "child_process";
import winston, { format } from "winston";
import colors from "colors";

dotenv.config();

const logLevelColors: { [key: string]: string } = {
    error: "bgRed",
    warn: "bgYellow",
    info: "bgMagenta",
    http: "bgBlue",
    debug: "bgCyan",
    silly: "bgGreen"
};

const logFormat = format.printf(({ level, message, timestamp }) => {
    const color: string = logLevelColors[level as keyof typeof logLevelColors] || "bgWhite";
    // @ts-ignore
    const coloredLevel = colors.white.bold[color](` ${level.toUpperCase()} `);
    return `${timestamp} ${coloredLevel} ${message}`;
});

const jsonFormat = format.printf(({ level, message, timestamp }) => {
    return JSON.stringify({ level, message, timestamp });
});

export const logger = winston.createLogger({
    level: "debug",
    format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.padLevels(),
        logFormat
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "error.log", level: "error", format: jsonFormat }),
        new winston.transports.File({ filename: "combined.log", format: jsonFormat }),
    ],
});

logger.info("Server starting");

sequelize
    .sync()
    .then(() => {
        logger.info("Connected to the database");
        app.listen(port, () => {
            logger.info(`Server listening on port ${port}`);
        });
    })
    .catch((err) => {
        logger.error("Unable to connect to the database:", err);
    });

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.use(authMiddleware);

app.use("/users", userRoutes);
app.use("/blog", blogRoutes);

// auth check
app.post("/auth/check", (req, res) => {
    res.status(200).json({ message: "Authenticated" });
});

let frontend_process = runFrontend();

export function runFrontend() {
    let frontend_process = exec("cd .. && cd frt-frontend && node server.js", (err, stdout, stderr) => {
        if (stderr) {
            return;
        }
    });
    logger.debug("Frontend server started")
    return frontend_process;
}

export function buildFrontend() {
    frontend_process.kill();
    logger.debug("Frontend server killed")
    let build_process = exec("cd .. && cd frt-frontend && npm run build", (err, stdout, stderr) => {
        if (err) {
            return;
        }
        if (stderr) {
            return;
        }

        frontend_process = runFrontend();
    });
}
