import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

const createRoom = async (req, res, next) => {

    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);
    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId,
                {
                    $push: { rooms: savedRoom._id },
                });
        } catch (error) {
            console.log(error);
            next(error);
        }
        res.status(200).json(savedRoom);
    } catch (error) {
        console.log(error);
        next(error)
    }
};

const updateRoom = async (req, res, next) => {
    try {
        const updateRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updateRoom);
    } catch (error) {
        next(error);
    }
}
const updateRoomAvailability = async (req, res, next) => {
    try {
        await Room.updateOne(
            { "roomNumber._id": req.params.id },
            {
                $push: {
                    "roomNumber.$.unvailableDates":req.body.dates
                },
            }
        ) 
        res.status(200).json("Room has been update");
    } catch (error) {
        next(error);
    }
}
const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
        await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: { rooms: req.params.id },
            });
        } catch (error) {
            next(error);
        }
        res.status(200).json("Room has been deleted");
    } catch (error) {
        next(error);
    }
}
const getRoom = async (req, res, next) => {
    try {
        const getRoom = await Room.findById(req.params.id)
        res.status(200).json(getHotel);
    } catch (error) {
        next(error);
    }
}
const getAllRoom = async (req, res, next) => {
    try {
        const getAllRoom = await Room.find()
        res.status(200).json(getAllRoom);
    } catch (error) {
        next(error);
    }
};

export {
    createRoom,
    updateRoom,
    getAllRoom,
    getRoom,
    deleteRoom,
    updateRoomAvailability
}