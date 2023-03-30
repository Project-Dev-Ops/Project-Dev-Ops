const mongoose = require('mongoose');
exports.connect = () => {
    mongoose.connect('mongodb://52.91.178.190:8105/', {
        dbName: "kodnuey"
    })
    .then(()=> console.log('Database is connected'))
    .catch((e) => console.log(e));
    };
