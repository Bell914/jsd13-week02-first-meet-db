use("sample_mflix");
db.movies.find({ plot: { $regex: "street.$", $options: "i" } }).count()



