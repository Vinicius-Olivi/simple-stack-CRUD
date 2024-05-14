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
  //res.send("express working")
  res.sendFile(__dirname + "/addBook.html");
});
app.post("/addBook", async (req, res) => {
  const { title, author } = req.body;
  try {
    const newBook = new Book({ title, author });
    await newBook.save();
    res.send("New book added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
