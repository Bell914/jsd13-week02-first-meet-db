use("sample_mflix");
// How many theaters does AL state has?
// db.theaters.find({ "location.address.state": "AL" }).count()
// How many theaters does La Quinta city has?
// db.theaters.find({ "location.address.city": "La Quinta" }).count()
// What is an example of each documents of above like?
db.theaters.findOne({ "location.address.city": "La Quinta" })

