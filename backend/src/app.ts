
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import blogPublicRoutes from "./routes/blogPublicRoutes";
import blogPrivateRoutes from "./routes/blogPrivateRoutes";
import sequelize from "./config/sequelize";
import authMiddleware from "./middleware/authMiddleware";
import { exec } from "child_process";
import winston, { format } from "winston";
import colors from "colors";
import session from "express-session";
import cookieParser from "cookie-parser";

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

logger.debug("Server starting");

sequelize
    .sync()
    .then(() => {
        logger.debug("Connected to the database");
        app.listen(port, () => {
            logger.debug(`Server listening on port ${port}`);
        });
    })
    .catch((err) => {
        logger.error("Unable to connect to the database:", err);
    });

const app = express();
const port = process.env.PORT || 3000;

app.use(
    session({
        secret: process.env.JWT_SECRET!,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: false,
        },
        store: new session.MemoryStore(),
    })
)
app.use(cookieParser()); 
app.use(cors(
    {
        origin: ["http://localhost:5173", "http://localhost:5000", "http://vargaking.me:5173", "http://vargaking.me:5000"],
        credentials: true,
    }
));
app.use(express.json());

app.use(express.static("public"));

app.use("/auth", authRoutes);
app.use("/blog", blogPublicRoutes);
app.use("/users", userRoutes);

// auth middleware
app.use(authMiddleware);

// below this line, all routes require authentication
app.use("/blog_admin", blogPrivateRoutes);

// auth check
app.post("/auth/check", (req, res) => {
    res.status(200).json({ authorized: true });
});

//let frontend_process = runFrontend();

export async function runFrontend() {
    let frontend_process = exec("cd .. && cd frt-frontend && node server.js", (err, stdout, stderr) => {
        if (stderr) {
            return;
        }
    });
    logger.debug("Frontend server started")
    return frontend_process;
}

export async function buildFrontend() {
    //(await frontend_process).kill();
    logger.debug("Frontend server killed");
  
    return new Promise((resolve, reject) => {
      exec("cd .. && cd frt-frontend && npm run build", (err, stdout, stderr) => {
        if (err) {
          reject(err);
        } else {
          logger.debug("Frontend server built");
          //frontend_process = runFrontend();
          resolve(true);
        }
      });
    });
  }
  