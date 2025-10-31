import express from "express";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import connectDB from "./lib/connectDB.js";
import dotenv from "dotenv";
import webHookRouter from "./routes/webhook.route.js";


dotenv.config();

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.use("/webhooks", webHookRouter);


app.use((error, req, res, next)=>{

    res.status(error.status || 500);

    res.json({message: error.message || "Sonething went wrong!",
    status: error.status,
    stack: error.stack,

    });
})

app.listen(3000, ()=>{
    connectDB();
    console.log("server is running!")
})