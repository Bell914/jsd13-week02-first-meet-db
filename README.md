# JSD13 – Week 02: First Meet DB

A MongoDB query practice project developed as part of Week 2 of the JSD13 course. This repository demonstrates fundamental to intermediate MongoDB query operations using the `sample_mflix` sample dataset.

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Query Reference](#query-reference)
- [Learning Outcomes](#learning-outcomes)
- [License](#license)
- [Author](#author)

## Overview

This project contains a collection of MongoDB queries written and tested against the `sample_mflix` sample database. It covers filtering, counting, pattern matching, sorting, logical operators, and aggregation pipelines.

## Project Structure

| File | Description |
|------|-------------|
| `query2.mongodb.js` | Core query examples covering `find`, `count`, and `regex` operations |
| `query3.mongodb.js` – `query6.mongodb.js` | Exercises 3–6, covering sorting, comparison operators, logical operators, and aggregation |
| `.mongodb.js` | Supplementary query scratchpad |
| `query-cheat-sheet.md` | Reference sheet summarizing all query patterns used in this project |

## Technologies

- [MongoDB](https://www.mongodb.com/)
- [MongoDB for VS Code Extension](https://marketplace.visualstudio.com/items?itemName=mongodb.mongodb-vscode)

## Prerequisites

Before running this project, ensure the following are installed and configured:

- [Visual Studio Code](https://code.visualstudio.com/)
- [MongoDB for VS Code Extension](https://marketplace.visualstudio.com/items?itemName=mongodb.mongodb-vscode)
- A running MongoDB instance (local) or a [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- The `sample_mflix` sample dataset loaded into your MongoDB instance

## Installation

```bash
# Clone the repository
git clone https://github.com/Bell914/jsd13-week02-first-meet-db.git

# Navigate into the project directory
cd jsd13-week02-first-meet-db
```

## Usage

1. Open the project folder in Visual Studio Code.
2. Ensure the MongoDB for VS Code extension is installed and enabled.
3. Connect to your MongoDB instance (local or Atlas) via the MongoDB extension panel.
4. Open any `.mongodb.js` file.
5. Execute individual queries using **Run Selected Lines** or **Run All**.

## Query Reference

### Switch Database

```javascript
use("sample_mflix");
```

### Find Documents

```javascript
db.movies.find({ type: "movie", rated: "TV-G" });
db.movies.findOne({ type: "movie", rated: "TV-G" });
```

### Count Documents

```javascript
db.movies.countDocuments({ type: "movie", rated: "TV-G" });
```

### Pattern Matching (Regex)

```javascript
db.movies.find({ plot: { $regex: "American", $options: "i" } });
```

### Sorting and Limiting Results

```javascript
db.movies.find({}).sort({ runtime: -1 }).limit(5);
```

### Logical Operators (AND / OR)

```javascript
// Implicit AND
db.movies.find({ year: 1995, genres: "Action" });

// Explicit OR
db.movies.find({
  $or: [{ languages: "French" }, { languages: "Spanish" }]
});
```

### Aggregation Pipeline

```javascript
db.movies.aggregate([
  { $match: { directors: "Hal Roach" } },
  { $group: { _id: null, totalWins: { $sum: "$awards.wins" } } }
]);
```

For the complete list of queries with detailed explanations, refer to [`query-cheat-sheet.md`](./query-cheat-sheet.md).

## Learning Outcomes

Through this project, the following MongoDB concepts were practiced:

- Basic document retrieval using `find()` and `findOne()`
- Pattern-based search using `$regex`
- Filtering with comparison operators (`$gt`, `$lt`, `$gte`, `$lte`)
- Logical query composition using implicit AND, explicit `$or`, and nested operators
- Basic aggregation using `$match`, `$group`, and `$sum`

## License

This project is licensed under the [MIT License](./LICENSE).

## Author

**Bell914**
GitHub: [https://github.com/Bell914](https://github.com/Bell914)
