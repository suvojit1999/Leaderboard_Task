import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userid: {type: String, required:true},
    points: {type: Number},
    date: { type: Date, default: Date.now }
  });


  const userHistory = mongoose.model('history', userSchema)
  export default userHistory