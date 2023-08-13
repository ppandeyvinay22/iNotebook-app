const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://pandey14:Vinay121@cluster0.llfewxs.mongodb.net/Notebook";

const connectToMongo = () => {
    mongoose.connect(mongoURI)
        .then(() => { console.log(`connection successful`) })
        .catch((err) => console.log(`no connection`));
}

module.exports = connectToMongo;
