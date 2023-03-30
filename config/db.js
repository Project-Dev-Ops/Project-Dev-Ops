const mongoose = require('mongoose');
exports.connect = () => {
    mongoose.connect('mongodb://100.25.220.167:8105/kodnuey')
    .then(()=> console.log('Database is connected'))
    .catch((e) => console.log(e));
    };
