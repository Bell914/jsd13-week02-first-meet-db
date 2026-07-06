use("sample_mflix");
// Find all movies released between 1950-1970 (inclusive) shown in USA
// db.movies.find({
//   year: { $gte: 1950, $lte: 1970 },
//   countries: "USA"
// })
// Count movies with genres "Drama" and "History" released after 1970
// db.movies.countDocuments({
//   genres: { $all: ["Drama", "History"] },
//   year: { $gt: 1970 }
// })
// How many films is Roy L. McCardell credited as an actor?
// db.movies.countDocuments({ cast: "Roy L. McCardell" })
// How many movies did Hal Roach directed?
// db.movies.countDocuments({ directors: "Hal Roach" })
// db.movies.countDocuments({ directors: "Hal Roach" })
// Movie with earliest release year directed by Hal Roach
// db.movies.find({ directors: "Hal Roach" }).sort({ year: 1 }).limit(1)
// How many awards did Hal Roach's movies win?
// db.movies.aggregate([
//   { $match: { directors: "Hal Roach" } },
//   { $group: { 
//       _id: null, 
//       totalWins: { $sum: "$awards.wins" } 
//     } 
//   }
// ])
// List all movies released in 1995 and classified as "Action"
// db.movies.find(
//   {
//     year: 1995,           
//     genres: "Action"      
//   },
//   { _id: 0, title: 1, year: 1, genres: 1 }   // projection
// );
// Exercise - Explicit OR): Find movies whose primary spoken language is French or Spanish.
// db.movies.find(
//   {
//     $or: [
//       { languages: "French" },
//       { languages: "Spanish" }
//     ]
//   },
//   { _id: 0, title: 1, languages: 1 }
// );
// Combined AND + OR - nesting operators): Retrieve up to 10 movies that are released after 2010 and belong to the Drama genre or have IMDB rating >= 8.
db.movies.find(
  {
    year: { $gt: 2010 },
    $or: [
      { genres: "Drama" },
      { "imdb.rating": { $gte: 8 } }
    ]
  },
  { _id: 0, title: 1, year: 1, genres: 1, "imdb.rating": 1 }
).limit(10);