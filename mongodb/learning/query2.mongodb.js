 use("sample_mflix");
//What is an example of type 'movie' and rated 'TV-G' look like?
 db.movies.find({ type: "movie", rated: "TV-G" }).count();
// How many movies are there in 'movie' type and 'TV-G' rated?
db.movies.find({ type: "movie", rated: "TV-G" });





