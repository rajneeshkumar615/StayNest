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

const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const MongoStore = require("connect-mongo");

const User = require("./models/user");
const ExpressError = require("./utils/ExpressError");
const { uploadDir } = require("./cloudConfig");

// ===============================
// ROUTES
// ===============================
const listings = require("./routes/listing");
const reviews = require("./routes/reviews");
const user = require("./routes/user");

// ===============================
// MONGO CHECK
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
// VIEW ENGINE
// ===============================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

// ===============================
// BASIC MIDDLEWARE
// ===============================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

if (uploadDir) {
  app.use("/uploads", express.static(uploadDir));
}

// ===============================
// IMPORTANT FOR VERCEL
// ===============================
app.set("trust proxy", 1);

// ===============================
// SESSION STORE (MONGODB)
// ===============================
const store = MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  dbName: "StayNest",
  ttl: 24 * 60 * 60, // 1 day
});

store.on("error", (err) => {
  console.log("SESSION STORE ERROR:", err);
});

// ===============================
// SESSION CONFIG (FINAL FIX)
// ===============================
app.use(
  session({
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,        // MUST be true on Vercel
      sameSite: "none",    // REQUIRED for cross-site cookies
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

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
// LOCALS
// ===============================
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  res.locals.curr = req.user;
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
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// ===============================
// ERROR HANDLER
// ===============================
app.use((err, req, res, next) => {
  console.error(err);
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error", { message, err });
});

// ===============================
// SERVER (LOCAL ONLY)
// ===============================
const PORT = process.env.PORT || 8080;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;