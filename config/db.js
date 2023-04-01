const mongoose = require('mongoose');
exports.connect = () => {
    mongoose.connect('mongodb://35.175.104.58:8105/kodnuey', {
        dbName: "kodnuey"
    })
    .then(()=> console.log('Database is connected'))
    .catch((e) => console.log(e));
    };
