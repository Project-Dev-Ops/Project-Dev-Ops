const mongoose = require('mongoose');
exports.connect = () => {
    mongoose.connect('mongodb://54.146.61.123:8105/', {
        dbName: "kodnuey"
    })
    .then(()=> console.log('Database is connected'))
    .catch((e) => console.log(e));
    };
