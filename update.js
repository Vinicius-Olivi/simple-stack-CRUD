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
  res.sendFile(__dirname + "/update.html");
});
app.post("/updateAuthor", async (req, res) => {
  const updatedTitle = req.body.title; // Retrieve the updated title from the form
  const updatedAuthor = req.body.author; // Retrieve the updated author from the form
  try {
    // Find the book by title
    const book = await Book.findOne({ title: updatedTitle }); // find the document
    if (!book) {
      res.send("Record not found");
      return;
    }
    book.author = updatedAuthor; // Update the author field
    await book.save(); // Update the document
    res.send("Record updated successfully");
  } catch (err) {
    console.error(err);
    res.send("Error updating the record");
  }
});

app.listen(3000, function () {
  console.log("Server running on 3000");
});
