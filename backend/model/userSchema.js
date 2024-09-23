import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required:true},
    points: {type: Number, required:true},
    date: { type: Date, default: Date.now },
    rank: {type: Number, default: 0},
    imageUrl: {type: String, default: "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg"}
  });


  const userdata = mongoose.model('user', userSchema)
  export default userdata