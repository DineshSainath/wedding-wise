const Vendor = require("../models/Vendor");

exports.getVendors = async (req, res) => {
  try {
    const category = req.query.category;
    const query = category ? { category } : {};
    const vendors = await Vendor.find(query);
    res.json(vendors);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching vendors", error: error.message });
  }
};
