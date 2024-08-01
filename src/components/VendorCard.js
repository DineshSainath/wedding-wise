import React from "react";

function VendorCard({ vendor }) {
  return (
    <div className="vendor-card">
      <h3>{vendor.name}</h3>
      <p>Rating: {vendor.rating}</p>
      <p>Price: {vendor.price}</p>
    </div>
  );
}

export default VendorCard;
