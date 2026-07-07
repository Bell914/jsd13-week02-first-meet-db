use("sample_mflix");
// How many movies does mentioned American in its plot?
// db.movies.find({ plot: { $regex: "American", $options: "i" } }).count()
// How many movies does end plot (sentence) with the street.
// db.movies.find({ plot: { $regex: "street.$", $options: "i" } }).count()
// What is data of above examples like?
db.movies.find({ plot: { $regex: "street.$", $options: "i" } })




