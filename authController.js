import userModel from "../models/userModel.js";
import errorMiddleware from "../middlewares/errorMiddleware.js";
export const registerController = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        if (!name) {
            next('name is required');
        }
        if (!email) {
            next('mail is required')
        }
        if (!password) {
            next('password is required')
        }
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            next('Email already registered')
        }
        const user = await userModel.create({ name, email, password });
        // res.status(200).send({
        //   success: true,
        //   message: 'User Created Successfully',
        //   user,
        //   })//
        const token = user.createJWT();
        res.status(201).send({
            success: true,
            message: "User Creation Done",
            user: {
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                location: user.location
            },
            token,
        });

    } catch (error) {
        next(error);
    }

};

export const loginController = async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        next('Please Provide all fields');
    }

    const user = await userModel.findOne({ email }).select("+password")
    if (!user) {
        next('Inavalid username or password')
    }
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
        next('Invalid Username or Password')
    }
    user.password = undefined;
    const token = user.createJWT();
    res.status(200).json({
        success: true,
        message: "Login Successfull",
        user,
        token,
    })



};



