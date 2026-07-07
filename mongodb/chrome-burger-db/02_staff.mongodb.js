use("chrome-burger-db");

// Clear existing data
db.staff.deleteMany({});

// Insert mock data for Staff collection
db.staff.insertMany([
  {
    "_id": ObjectId("65f100000000000000000001"),
    "first_name": "Jane",
    "last_name": "Doe",
    "role": "Cashier"
  },
  {
    "_id": ObjectId("65f100000000000000000002"),
    "first_name": "John",
    "last_name": "Smith",
    "role": "Cook"
  },
  {
    "_id": ObjectId("65f100000000000000000003"),
    "first_name": "Emily",
    "last_name": "Jones",
    "role": "Cashier"
  },
  {
    "_id": ObjectId("65f100000000000000000004"),
    "first_name": "Chris",
    "last_name": "Williams",
    "role": "Cook"
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
