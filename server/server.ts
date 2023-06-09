import express from "express";
import mongoose from "mongoose";
import path from "path";
import session from "express-session";
import passport from "passport";

const LocalStrategy = require("passport-local").Strategy;
const Schema = mongoose.Schema;

const mongoDb = "YOUR MONGO URL HERE";
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const User = mongoose.model(
  "User",
  new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
  })
);

const app = express();
app.set("views", __dirname);
app.set("view engine", "ejs");
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => res.render("index"));
app.listen(3000, () => console.log("app listening on port 3000!"));
