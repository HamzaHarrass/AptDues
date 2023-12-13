const express = require("express");
require("./config/DBconnection")()
const app = express();
const authRouter = require("./routes/authRouter");
const appartementRoutes = require('./routes/appartementRouter');
const cors = require('cors');


app.use(express.json());
require('dotenv').config();

app.use(cors({
    origin : "http://localhost:5173"
}))
app.get('/',(req,res)=>{
    res.status(200).json({message:"ALL IS GOOD"})
})
app.use("/auth",authRouter);

app.use('/api', appartementRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});