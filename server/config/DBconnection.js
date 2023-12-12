const mongoose = require('mongoose');

const url ="mongodb+srv://hamzagames080:JypCaNOQkMvGOOkE@cluster0.ezvyfwo.mongodb.net/AptDues?retryWrites=true&w=majority";
function connection (){
    mongoose.connect(url).then(()=>{
        console.log(" db connection success");
    }).catch(()=>{
        console.log(" db connection failed");
    });
}

module.exports = connection; 