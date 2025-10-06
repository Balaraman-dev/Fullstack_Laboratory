const mongoose =require("mongoose");

const products= new mongoose.Schema({
    author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    },
    pname: {type :String,required:true},
    desc:String,
    Image:String,
    postDate:Date,
}
)