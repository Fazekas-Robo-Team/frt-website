const dotenv = require("dotenv");
dotenv.config();

// get dotenv variables
const { DB_USER, DB_PASSWORD, REGISTER_SECRET, SECRET } = process.env;

const express = require("express");

const app = express();

const { Sequelize } = require("sequelize");

const db = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@192.168.0.152:5432/frt`);

try {
    db.authenticate();
    console.log("Connection has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database:", error);
}

const User = db.define("user", {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

db.sync().then(() => {
    console.log("Database synchronized");
});

const bcrypt = require("bcrypt");

const hashPassword = async (user, options) => {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const session = require("express-session");
app.use(
    session({
        secret: SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send({ error: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.userID = decoded.id;
        next();
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const PORT = 3000;

app.post("/register", async (req, res) => {
    console.log(req.body.password);
    try {
        const user = await User.create(req.body);
        res.send(user);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.body.username } });
        if (!user) {
            res.status(400).send({ error: "User not found" });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            res.status(400).send({ error: "Invalid password" });
        }

        const token = jwt.sign({ id: user.id }, SECRET, {
            expiresIn: 86400, // expires in 24 hours
        });

        req.cookie("token", token, { httpOnly: true });
        res.send({ message: "Login successful" });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.send({ message: "Logout successful" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
