import mongoose from 'mongoose';
const { Schema } = mongoose;

const RoomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    maxPeople: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true,
    },
    roomNumber: [{number:Number,unvailableDates:{type:[Date]} }],
},
    {timestamps:true}
);

const Room= mongoose.model("Room",RoomSchema)
export default Room;
