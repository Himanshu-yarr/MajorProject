const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");//for requiring the wrapAsync fn form utils.
const Listing = require("../models/listing");//for listing.js in models
const { isLoggedIn, isOwner, validateListing } = require("../middleware");//for requiring the middleware of checking if the user is loggedIn or Not.
const listingController = require("../controllers/listings");
const multer = require('multer')
const { storage } = require("../cloudConfig")
const upload = multer({ storage });

//we wrapped every async routes inside wrapAsync() so that they can handle async errors.

router.route("/")
  .get(wrapAsync(listingController.index))//Index route
  .post(isLoggedIn, upload.single('listing[image][url]'), validateListing, wrapAsync(listingController.createListing));//Create Route  //we used wrapAsync here to handle async errors.


router.get("/new", isLoggedIn, listingController.renderNewForm); //New Route


router.route("/:id")
  .get(wrapAsync(listingController.showListing))//Show Route
  .put(isLoggedIn, isOwner, upload.single("listing[image][url]"), validateListing, wrapAsync(listingController.updateListing))//Update Route
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));//Delete Route


router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));//Edit Route






module.exports = router;