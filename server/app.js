const express = require("express");
const cors = require("cors");
const  userRouter  =  require("./routes/user.js");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);

app.listen(3001, () => console.log("Server started on port 3001"));
