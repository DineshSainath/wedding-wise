require("dotenv").config();
const mongoose = require("mongoose");
const Vendor = require("./models/Vendor");

const vendors = [
  // Venues
  {
    name: "Elegant Manor",
    category: "Venues",
    description: "A beautiful Victorian manor with sprawling gardens",
    cost: 5000,
    rating: 4.8,
  },
  {
    name: "Seaside Resort",
    category: "Venues",
    description: "Breathtaking beachfront venue for a romantic wedding",
    cost: 6000,
    rating: 4.9,
  },
  {
    name: "Urban Loft",
    category: "Venues",
    description: "Modern city loft with skyline views",
    cost: 4000,
    rating: 4.7,
  },

  // Photography
  {
    name: "Capture Moments",
    category: "Photography",
    description: "Award-winning wedding photography",
    cost: 2500,
    rating: 4.9,
  },
  {
    name: "Timeless Images",
    category: "Photography",
    description: "Experienced photographers capturing your special day",
    cost: 2000,
    rating: 4.7,
  },
  {
    name: "Artistic Visions",
    category: "Photography",
    description: "Unique and creative wedding photography",
    cost: 2800,
    rating: 4.8,
  },

  // Catering
  {
    name: "Delightful Dishes",
    category: "Catering",
    description: "Exquisite cuisine for your wedding feast",
    cost: 3500,
    rating: 4.8,
  },
  {
    name: "Gourmet Celebrations",
    category: "Catering",
    description: "Customized menus to suit your tastes",
    cost: 4000,
    rating: 4.9,
  },
  {
    name: "Flavor Fusion",
    category: "Catering",
    description: "Innovative culinary experiences for your wedding",
    cost: 3800,
    rating: 4.7,
  },

  // Decor
  {
    name: "Elegant Arrangements",
    category: "Decor",
    description: "Stunning floral and decor arrangements",
    cost: 3000,
    rating: 4.8,
  },
  {
    name: "Whimsical Wonders",
    category: "Decor",
    description: "Magical and unique wedding decorations",
    cost: 3500,
    rating: 4.7,
  },
  {
    name: "Classic Charm",
    category: "Decor",
    description: "Timeless and sophisticated wedding decor",
    cost: 2800,
    rating: 4.6,
  },

  // Music
  {
    name: "Harmony Makers",
    category: "Music",
    description: "Versatile band for all your wedding music needs",
    cost: 2000,
    rating: 4.8,
  },
  {
    name: "DJ Celebrations",
    category: "Music",
    description: "Experienced DJ to keep your party going",
    cost: 1500,
    rating: 4.7,
  },
  {
    name: "Classical Strings",
    category: "Music",
    description: "Elegant string quartet for your ceremony and cocktail hour",
    cost: 1800,
    rating: 4.9,
  },

  // Attire
  {
    name: "Bridal Elegance",
    category: "Attire",
    description: "Designer wedding gowns and accessories",
    cost: 2000,
    rating: 4.8,
  },
  {
    name: "Dapper Gents",
    category: "Attire",
    description: "Fine suits and tuxedos for the groom and groomsmen",
    cost: 1500,
    rating: 4.7,
  },
  {
    name: "Custom Creations",
    category: "Attire",
    description: "Bespoke wedding attire for the entire wedding party",
    cost: 2500,
    rating: 4.9,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await Vendor.deleteMany({});
    await Vendor.insertMany(vendors);

    console.log("Database seeded successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
