const mongoose = require("mongoose");
const Vendor = require("../models/Vendor");
const path = require("path");
const { vendorData } = require(path.join(
  __dirname,
  "..",
  "..",
  "src",
  "pages",
  "vendorData"
));
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected for seeding..."))
  .catch((err) => console.error("MongoDB connection error:", err));

const seedVendors = async () => {
  try {
    await Vendor.deleteMany({}); // Clear existing vendors

    for (const category in vendorData) {
      const vendors = vendorData[category].map((vendor) => ({
        ...vendor,
        category,
      }));
      await Vendor.insertMany(vendors);
    }

    console.log("Vendors seeded successfully");
    mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding vendors:", error);
    mongoose.disconnect();
  }
};

seedVendors();
