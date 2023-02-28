"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const sequelize_1 = __importDefault(require("./config/sequelize"));
const authMiddleware_1 = __importDefault(require("./middleware/authMiddleware"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(authMiddleware_1.default);
app.use('/auth', authRoutes_1.default);
app.use('/users', userRoutes_1.default);
sequelize_1.default
    .authenticate()
    .then(() => {
    console.log('Connected to the database');
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
})
    .catch((err) => {
    console.error('Unable to connect to the database:', err);
});
