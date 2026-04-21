if (process.env.NODE_ENV != "production") {
  require('dotenv').config()
}
//console.log(process.env.SECRET)

const express = require("express");//for express
const app = express();//for express
const mongoose = require("mongoose");//for mongoose
const path = require("path");//for views folder
const methodOverride = require("method-override");//for using method-override package
const ejsMate = require("ejs-mate");//for using ejs-mate package
const ExpressError = require("./utils/ExpressError");//for requiring the ExpressError fn from utils.
const session = require("express-session");
const MongoStore = require('connect-mongo').default;
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");// requires the model with Passport-Local Mongoose plugged in

const listingRouter = require("./routes/listing");
const reviewRouter = require("./routes/review");
const userRouter = require("./routes/user");

const dbUrl = process.env.ATLASDB_URL;

main()// for mongoose
  .then(() => {
    console.log("Connected to db");
  })
  .catch(err => console.log(err));

async function main() {
  []
  await mongoose.connect(dbUrl);
}//for mongoose


app.set("view engine", "ejs"); //for views folder, ejs
app.set("views", path.join(__dirname, "views"));//for views folder, ejs
app.use(express.urlencoded({ extended: true }));//for parsing form data, and using post route.
app.use(methodOverride("_method"));//for using methodoverride for put and delete route
app.engine('ejs', ejsMate);//for using ejs mate package.
app.use(express.static(path.join(__dirname, "/public")));//for using public folder

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600

});

store.on("error", function (e) {
  console.log(" ERROR IN MONGO SESSION STORE", e);
});

//session options
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  }
};

app.get("/", (req, res) => {
  res.redirect("/listing");
});


//for express session and connect flash package
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));// use static authenticate method of model in LocalStrategy

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//this is a middleware for showing the success and error message in every route.
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  res.locals.search = req.query.search || "";
  next();
})

// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "student@gmail.com",
//     username: "himanshu"
//   });

//   let registeredUser = await User.register(fakeUser, "helloworld");
//   res.send(registeredUser);
// })

//routes
app.use("/listing", listingRouter);
app.use("/listing/:id/reviews/", reviewRouter);
app.use("/", userRouter);


//error handling
app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found")); //this is for all the random paths that are not defined above in 
});
//this is a simple Express middleware for error handling   //you  can check ExpressError.js for better understanding.
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { message })
});


//server starting
app.listen(8080, () => {
  console.log("Server is listing on port 8080");
});