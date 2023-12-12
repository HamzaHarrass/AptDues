const mongoose = require('mongoose');

const url ="mongodb+srv://hamzaharrass05:pZE0PpqHndvouOsL@cluster0.o4hwrvz.mongodb.net/?retryWrites=true&w=majority";
function connection (){
    mongoose.connect(url, {
        dbName: "AptDues"
    }).then(()=>{
        console.log(" db connection success");
    }).catch((error)=>{
        console.log(error);
    });
    
}

module.exports = connection; 