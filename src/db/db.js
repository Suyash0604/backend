const mongoose = require('mongoose');

function connectTODB(){
    mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log("Connected To DB");
    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports = connectTODB;