// backend/routes/user.js
const express = require('express');
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");
const { hashPassword, comparePassword } = require("../utils/passwordUtil.js")

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: " Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken"
        })
    }

    const hashedPassword = await hashPassword(req.body.password);
    const user = await User.create({
        username: req.body.username,
        password: hashedPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;
    const randomBalance = 1 + Math.random() * 10000
    await Account.create({ userId, balance: randomBalance })

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    const user = await User.findOne({
        username: req.body.username,

    });
    const isValidUser = user && (await comparePassword(req.body.password, user.password));

    if (isValidUser) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.json({
            token: token
        })
        return;
    }


    res.status(411).json({
        message: "Error while logging in"
    })
})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/update", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.findByIdAndUpdate(req.userId, { $set: req.body })

    res.json({
        message: "Updated successfully"
    })
})

router.get("/getCurrentUser/", authMiddleware, async (req, res) => {
    const { userId } = req;
    let user = await User.findById(userId);
    const userWithoutPassword = {
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName
    }
    user = null;


    res.json({ user: userWithoutPassword });
})

router.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";
    const { userId } = req;
    let users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter, $options: "i"
            }
        }, {
            lastName: {
                "$regex": filter, $options: "i"
            }
        }]
    })

    users = users.filter((user) => {
        return user._id != userId;
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })

    users = null;
})

module.exports = router;