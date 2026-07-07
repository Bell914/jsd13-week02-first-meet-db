// use("sample_mflix");
// How many theaters does AL state has?
// db.theaters.find({ "location.address.state": "AL" }).count()
// How many theaters does La Quinta city has?
// db.theaters.find({ "location.address.city": "La Quinta" }).count()
// What is an example of each documents of above like?
// db.theaters.findOne({ "location.address.city": "La Quinta" })


use("sample_mflix");
[
  db.movies.find({ plot: { $regex: "princess", $options: "i" } }).count(),
  db.movies.find({ plot: { $regex: "prince", $options: "i" } }).count()
]
// count of movies with plot containing "princess" and "prince"

use("sample_mflix");

({
  princess_count: db.movies.find({ plot: { $regex: "princess", $options: "i" } }).count(),
  prince_count: db.movies.find({ plot: { $regex: "prince", $options: "i" } }).count()
})