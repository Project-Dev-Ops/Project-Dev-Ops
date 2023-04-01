const mongoose = require('mongoose');
exports.connect = () => {
    mongoose.connect('mongodb://34.232.198.199:8105/', {
        dbName: "kodnuey"
    })
    .then(()=> console.log('Database is connected'))
    .catch((e) => console.log(e));
    };
