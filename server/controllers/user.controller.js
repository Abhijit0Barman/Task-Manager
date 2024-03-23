const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../models/blacklist.model");
require("dotenv").config();

async function handleGetAllUsers(req, res) {
    try {
        const allDbUsers = await UserModel.find({});
        return res.send(allDbUsers);
    } catch (error) {
        res.status(401).send({ error: error.message });
    }
}

const handleGetUserById = async (req, res) => {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    if (!user) return res.status(404).json({ err: "Does Not Exist" });
    return res.json({ msg: "User Profile", user });
};

const handleUpdateUserById = async (req, res) => {
    const id = req.params.id;
    const user = await UserModel.findByIdAndUpdate(id, req.body);

    return res.json({ msg: "Update Completed", user });
};

async function handleDeleteUserById(req, res) {
    const id = req.params.id;

    await UserModel.findByIdAndDelete(id);
    return res.json({ msg: "Deleted Successfully" });
}

const handleCreateNewUser = async (req, res) => {
    const body = req.body;
    const { username, email, password } = body;
    if (!body || !password || !email || !username) {
        return res.status(400).json({ error: "All Fields is Required" });
    }

    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(200).send({ message: "User Already Exists" });
        }
        bcrypt.hash(password, 5, async function (err, hash) {
            if (err) {
                res.status(200).send({
                    error: err.message,
                });
            } else {
                const user = new UserModel({
                    username,
                    email,
                    password: hash,
                });
                await user.save();
                res.status(201).send({
                    msg: "User Registered Successfully",
                    registered_mail: email,
                    id: user._id,
                });
            }
        });
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
};

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                    res.status(201).send({ error: err.message });
                }
                // result == true
                if (result) {
                    const token = jwt.sign(
                        { userID: user._id, username: user.username },
                        process.env.SECRET_KEY,
                        {
                            expiresIn: "7d",
                        }
                    );

                    const refresh_token = jwt.sign(
                        { email: email },
                        process.env.REFRESH_TOKEN_SECRET,
                        { expiresIn: "28d" }
                    );

                    res.status(201).send({
                        msg: "User Logged in Successfully",
                        token: token,
                        refresh_token,
                    });
                } else {
                    res.status(201).send({ msg: "Wrong Password!" });
                }
            });
        } else {
            res.status(201).send({
                msg: "User does not exist, Please Register!",
            });
        }
    } catch (error) {
        res.status(401).send({ error: error.message });
    }
};

const handleLogout = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    try {
        const blackToken = new BlacklistModel({ token });
        await blackToken.save();
        res.status(201).send({
            msg: "User Logout successfully",
        });
    } catch (error) {
        res.status(401).send({ error: error.message });
    }
};

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser,
    handleLogin,
    handleLogout,
};
