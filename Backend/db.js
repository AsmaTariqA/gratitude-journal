const mongoose = require('mongoose');
const mongoURL = "mongodb://127.0.0.1:27017/inotepad?authMechanism=DEFAULT";




const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = connectToMongo;

