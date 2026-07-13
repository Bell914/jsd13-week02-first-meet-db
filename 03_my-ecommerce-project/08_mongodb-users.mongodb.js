use("nakom-db");

// Clear existing data
db.users.deleteMany({});

// Insert mock data for Users collection
db.users.insertMany([
  {
    "_id": ObjectId("65f100000000000000000001"),
    "full_name": "สมชาย ใจดี",
    "email": "somchai@example.com",
    "phone": "081-234-5671",
    "password_hash": "$2b$10$examplehashvalue0001",
    "role": "customer",
    "created_at": ISODate("2026-01-05T09:00:00Z")
  },
  {
    "_id": ObjectId("65f100000000000000000002"),
    "full_name": "วิภา รักเรียน",
    "email": "wipha@example.com",
    "phone": "082-345-6782",
    "password_hash": "$2b$10$examplehashvalue0002",
    "role": "customer",
    "created_at": ISODate("2026-02-10T14:30:00Z")
  },
  {
    "_id": ObjectId("65f100000000000000000003"),
    "full_name": "น้าคอม สเปคพอดี",
    "email": "nakom.consultant@nakom.com",
    "phone": "083-456-7893",
    "password_hash": "$2b$10$examplehashvalue0003",
    "role": "consultant",
    "created_at": ISODate("2025-11-01T08:00:00Z")
  },
  {
    "_id": ObjectId("65f100000000000000000004"),
    "full_name": "ช่างเอก ซ่อมด่วน",
    "email": "technician.ake@nakom.com",
    "phone": "084-567-8904",
    "password_hash": "$2b$10$examplehashvalue0004",
    "role": "technician",
    "created_at": ISODate("2025-11-01T08:00:00Z")
  },
  {
    "_id": ObjectId("65f100000000000000000005"),
    "full_name": "ผู้ดูแลระบบ",
    "email": "admin@nakom.com",
    "phone": "085-678-9015",
    "password_hash": "$2b$10$examplehashvalue0005",
    "role": "admin",
    "created_at": ISODate("2025-10-15T00:00:00Z")
  }
]);
