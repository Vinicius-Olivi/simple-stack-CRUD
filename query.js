const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
mongoose.connect(
  "mongodb+srv://viniciusolivi:vcUEtMayrMhipi7n@vocluster.ipcls0v.mongodb.net/Library",
  { useNewUrlParser: true },
  { useUnifiedTopology: true },
);

const bookSchema = {
  title: String,
  author: String,
};
const Book = mongoose.model("Book", bookSchema, "books");
//app get
app.get("/", function (req, res) {
  //res.send("express working");
  res.sendFile(__dirname + "/query.html");
});

app.get("/searchAuthor", async (req, res) => {
  const author = req.query.author;
  try {
    const docs = await Book.find({ author });
    let html = "<CENTER>";
    html += "<table border =1 width=500>";
    html += "<tr><th>Title</th><th>Author</th></tr>";

    docs.forEach((doc) => {
      html += `<tr><td>${doc.title}</td><td>${doc.author}</td></tr>`;
    });
    html += "</table>";
    res.send(html);
  } catch (err) {
    console.error(err);
    res.sendStatus("Error executing the query");
  }
});

app.listen(3000, function () {
  console.log("Server running on 3000");
});
