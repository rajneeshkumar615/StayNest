// ===============================
// ENV CONFIG
// ===============================
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// ===============================
// CORE IMPORTS
// ===============================
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

// ===============================
// ROUTES
// ===============================
const listings = require("./routes/listing");
const reviews = require("./routes/reviews");
const user = require("./routes/user");

// ===============================
// AUTH / SESSION
// ===============================
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

// ===============================
// CUSTOM ERROR
// ===============================
const ExpressError = require("./utils/ExpressError");

// ===============================
// ENV CHECK
// ===============================
if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is missing in environment variables");
}

// ===============================
// DB CONNECTION
// ===============================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

// ===============================
// APP CONFIG
// ===============================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// ===============================
// SESSION CONFIG (Vercel-safe minimal)
// ===============================
const sessionOptions = {
  secret: process.env.SECRET || "devsecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
  },
};

app.use(session(sessionOptions));
app.use(flash());

// ===============================
// PASSPORT CONFIG
// ===============================
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ===============================
// GLOBAL LOCALS
// ===============================
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// ===============================
// ROUTES
// ===============================
app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);
app.use("/", user);

// ===============================
// 404 HANDLER
// ===============================
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// ===============================
// ERROR HANDLER
// ===============================
app.use((err, req, res, next) => {
  console.error(err);

  let { statusCode = 500, message = "Something went wrong" } = err;

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  }

  if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate key error";
  }

  res.status(statusCode).render("error", { message, err });
});

// ===============================
// EXPORT (IMPORTANT FOR VERCEL)
// ===============================
module.exports = app;