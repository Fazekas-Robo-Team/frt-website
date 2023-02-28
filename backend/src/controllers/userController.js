"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.JWT_SECRET;
class UserController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password } = req.body;
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const user = yield user_1.default.create({
                    username,
                    email,
                    password: hashedPassword,
                });
                res.json({ success: true, data: user });
            }
            catch (error) {
                res.status(500).json({ success: false, message: "Failed to register user :(" });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const user = yield user_1.default.findOne({ where: { username } });
                if (!user) {
                    res.status(401).json({ success: false, message: "Incorrect email or password" });
                    return;
                }
                const isPasswordCorrect = yield bcrypt_1.default.compare(password, user.password);
                if (!isPasswordCorrect) {
                    res.status(401).json({ success: false, message: "Incorrect email or password" });
                    return;
                }
                const token = jsonwebtoken_1.default.sign({ userId: user.id }, secret, { expiresIn: '1d' });
                res.json({ token });
            }
            catch (error) {
                res.status(500).json({ success: false, message: "Failed to login user :(" });
            }
        });
    }
}
exports.default = new UserController();
