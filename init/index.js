if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ quiet: true });
}

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const mongo_url = process.env.MONGO_URI;

async function main() {
  try {
    if (!mongo_url) {
      throw new Error("MONGO_URI is missing. Check your .env file");
    }

    await mongoose.connect(mongo_url);
    console.log("Connected with Database");

    let ownerUser = await User.findOne({ username: "admin" });

    if (!ownerUser) {
      ownerUser = new User({
        email: "admin@staynest.com",
        username: "admin",
      });

      await User.register(ownerUser, "admin123");
      console.log("Admin user created");
    }

    await Listing.deleteMany({});

    const dataWithOwner = initData.data.map(obj => ({
      ...obj,
      owner: ownerUser._id,
      image: {
        url: obj.image,
        filename: "listingimage",
      },
    }));

    await Listing.insertMany(dataWithOwner);

    console.log("Finally Data has been initialized");
    await mongoose.connection.close();
  } catch (err) {
    console.log(err);
    await mongoose.connection.close();
  }
}

main();