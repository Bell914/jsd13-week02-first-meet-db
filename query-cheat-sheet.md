# MongoDB Query Cheat Sheet

A reference collection of MongoDB queries used in the `first-meet-dbs` project, compiled from all `.mongodb.js` files.

## 1. Find — Retrieving Documents

```javascript
// Retrieve all documents from the comments collection
db.comments.find();

// Find movies where type is "movie" and rated is "TV-G"
db.movies.find({ type: "movie", rated: "TV-G" });

// Find a single theater document where city is "La Quinta"
db.theaters.findOne({ "location.address.city": "La Quinta" });
```

## 2. Count — Counting Documents

```javascript
// Count movies where type is "movie" and rated is "TV-G"
db.movies.find({ type: "movie", rated: "TV-G" }).count();

// Count theaters located in the state of AL
db.theaters.find({ "location.address.state": "AL" }).count();

// Count theaters located in the city of La Quinta
db.theaters.find({ "location.address.city": "La Quinta" }).count();

// Count movies released between 1990 and 2000
db.movies.find({
  released: {
    $gte: ISODate("1990-01-01T00:00:00Z"),
    $lt: ISODate("2001-01-01T00:00:00Z")
  }
}).count();
```

### countDocuments

```javascript
// Count movies in Drama and History genres released after 1970
db.movies.countDocuments({
  genres: { $all: ["Drama", "History"] },
  year: { $gt: 1970 }
});

// Count movies featuring Roy L. McCardell as cast
db.movies.countDocuments({ cast: "Roy L. McCardell" });

// Count movies directed by Hal Roach
db.movies.countDocuments({ directors: "Hal Roach" });
```

## 3. Regex — Pattern-Based Search

```javascript
// Count movies whose plot contains "American" (case-insensitive)
db.movies.find({ plot: { $regex: "American", $options: "i" } }).count();

// Count movies whose plot ends with "street"
db.movies.find({ plot: { $regex: "street.$", $options: "i" } }).count();

// Retrieve movies whose plot ends with "street"
db.movies.find({ plot: { $regex: "street.$", $options: "i" } });
```

## 4. Sort / Limit — Ordering and Restricting Results

```javascript
// Top 5 movies by longest runtime
db.movies.find({}).sort({ runtime: -1 }).limit(5);

// Top 5 movies with runtime under 60 minutes, sorted descending
db.movies.find({ runtime: { $lt: 60 } }).sort({ runtime: -1 }).limit(5);

// 3 movies released between 1955–1965, sorted oldest to newest
db.movies.find({ year: { $gt: 1954, $lt: 1966 } }).sort({ year: 1 }).limit(3);

// Earliest movie directed by Hal Roach
db.movies.find({ directors: "Hal Roach" }).sort({ year: 1 }).limit(1);
```

## 5. Projection — Selecting Specific Fields

```javascript
// Return only title, year, and genres (excluding _id)
db.movies.find(
  { year: 1995, genres: "Action" },
  { _id: 0, title: 1, year: 1, genres: 1 }
);

// Return only title and languages
db.movies.find(
  { $or: [{ languages: "French" }, { languages: "Spanish" }] },
  { _id: 0, title: 1, languages: 1 }
);

// Return only title, year, genres, and imdb.rating (limited to 10 results)
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
```

## 6. Comparison Operators

```javascript
// Runtime less than 60 minutes
db.movies.find({ runtime: { $lt: 60 } });

// Year greater than 1954 and less than 1966
db.movies.find({ year: { $gt: 1954, $lt: 1966 } });

// Released between 1990-01-01 and 2000-12-31
db.movies.find({
  released: {
    $gte: ISODate("1990-01-01T00:00:00Z"),
    $lt: ISODate("2001-01-01T00:00:00Z")
  }
});

// Year between 1950–1970 (inclusive), shown in the USA
db.movies.find({
  year: { $gte: 1950, $lte: 1970 },
  countries: "USA"
});

// Year greater than 2010 and imdb.rating >= 8
db.movies.find({
  year: { $gt: 2010 },
  $or: [{ genres: "Drama" }, { "imdb.rating": { $gte: 8 } }]
});
```

## 7. Logical Operators — AND / OR

**Implicit AND** (fields listed together)
```javascript
db.movies.find({ type: "movie", rated: "TV-G" });
db.movies.find({ year: 1995, genres: "Action" });
```

**`$all`** — all specified values must be present in the array
```javascript
db.movies.countDocuments({ genres: { $all: ["Drama", "History"] } });
```

**`$or`** — at least one condition must be true
```javascript
db.movies.find({
  $or: [
    { languages: "French" },
    { languages: "Spanish" }
  ]
});
```

**Combined AND + OR** (nested operators)
```javascript
db.movies.find({
  year: { $gt: 2010 },
  $or: [
    { genres: "Drama" },
    { "imdb.rating": { $gte: 8 } }
  ]
});
```

## 8. Aggregation — Data Computation

```javascript
// Sum the total award wins for movies directed by Hal Roach
db.movies.aggregate([
  { $match: { directors: "Hal Roach" } },
  { $group: {
      _id: null,
      totalWins: { $sum: "$awards.wins" }
    }
  }
]);
```

## Operator Reference

| Operator | Description | Example |
|----------|-------------|---------|
| `$gt` | Greater than | `{ year: { $gt: 2010 } }` |
| `$gte` | Greater than or equal to | `{ year: { $gte: 1950 } }` |
| `$lt` | Less than | `{ runtime: { $lt: 60 } }` |
| `$lte` | Less than or equal to | `{ year: { $lte: 1970 } }` |
| `$regex` | Pattern-based text search | `{ plot: { $regex: "American", $options: "i" } }` |
| `$options: "i"` | Case-insensitive matching (used with `$regex`) | — |
| `$all` | All specified values must exist in the array | `{ genres: { $all: ["Drama", "History"] } }` |
| `$or` | At least one condition must be true | `{ $or: [{...}, {...}] }` |
| `$sum` | Aggregates a numeric total | `{ $sum: "$awards.wins" }` |
| `$match` | Filters documents within an aggregation pipeline | `{ $match: { directors: "Hal Roach" } }` |
| `$group` | Groups documents within an aggregation pipeline | `{ $group: { _id: null, totalWins: { $sum: "..." } } }` |

## Query Modifiers

| Modifier | Description |
|----------|-------------|
| `.count()` | Returns the number of matching documents |
| `.sort({ field: 1 })` | Sorts results in ascending order |
| `.sort({ field: -1 })` | Sorts results in descending order |
| `.limit(n)` | Restricts the number of returned documents |
| Projection `{ field: 1 }` | Includes only the specified field(s) |
| Projection `{ _id: 0 }` | Excludes the `_id` field |
| `ISODate("...")` | Defines a date value in MongoDB's ISO format |
