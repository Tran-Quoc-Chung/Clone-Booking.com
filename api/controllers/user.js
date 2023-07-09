import User from '../models/User.js'
const createUser = async (req, res, next) => {
    const newUser = new User(req.body);
    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (error) {
        next(error);
    }
}
const updateUser = async (req, res, next) => {
    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updateUser);
    } catch (error) {
        next(error);
    }
}
const deleteUser = async (req, res, next) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been delete ");
    } catch (error) {
        next(error);
    }
}
const getUser = async (req, res, next) => {
    try {
        const getUser = await User.findById(req.params.id)
        res.status(200).json(getUser);
    } catch (error) {

        next(error);
    }
}
const getAllUser = async (req, res, next) => {
    try {
        const getAllUser = await User.find()
        res.status(200).json(getAllUser);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export {
    createUser,
    updateUser,
    getAllUser,
    getUser,
    deleteUser
}