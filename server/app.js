const express = require("express");
require("./config/DBconnection")()
const cookieParser = require('cookie-parser');
const app = express();
const authRouter = require("./routes/authRouter");
const appartementRoutes = require('./routes/appartementRouter');
const clientRouter = require('./routes/clientRouter');
const paiementRouter = require('./routes/paiementRouter');

const cors = require('cors');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require('dotenv').config();

app.use(cors({
    origin : "http://localhost:5170"
}))
app.get('/',(req,res)=>{
    res.status(200).json({message:"ALL IS GOOD"})
})
app.use("/auth",authRouter);

app.use('/api', appartementRoutes);
app.use('/api', clientRouter);
app.use('/api', paiementRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});