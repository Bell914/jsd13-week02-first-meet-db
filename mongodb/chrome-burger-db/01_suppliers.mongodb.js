use("chrome-burger-db");
// Clear existing data
db.suppliers.deleteMany({});      // ← ตรงนี้ควรเป็น orders ไม่ใช่ suppliers
// Insert mock data for Suppliers collection   // ← comment ก็ยังเป็น Suppliers อยู่
db.suppliers.insertMany([
  {
    "_id": ObjectId("65f000000000000000000001"),
    "name": "Patty's Premium Meats",
    "contact_person": "Patty Smith",
    "phone_number": "555-0101"
  },
  {
    "_id": ObjectId("65f000000000000000000002"),
    "name": "The Bun Barn",
    "contact_person": "Brad Breadson",
    "phone_number": "555-0102"
  },
  {
    "_id": ObjectId("65f000000000000000000003"),
    "name": "Freshest Farm Produce",
    "contact_person": "Frank Farmer",
    "phone_number": "555-0103"
  }
]);


// Find all orders and show staff details
db.orders.aggregate([
  {
    $lookup: {
      from: "staff",
      localField: "staff_id",
      foreignField: "_id",
      as: "staff_info"
    }
  },
  { $unwind: "$staff_info" }
]);

