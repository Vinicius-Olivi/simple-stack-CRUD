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
  res.sendFile(__dirname + "/delete.html");
});

app.post("/bookDelete", async (req, res) => {
  const titleToDelete = req.body.title;
  try {
    const deletedDoc = await Book.findOneAndDelete({ title: titleToDelete });
    if (!deletedDoc) {
      res.send("Document not found");
      return;
    }
    res.send("Document deleted successfully");
  } catch (err) {
    console.error(err);
    res.send("Error deleting the document");
  }
});

app.listen(3000, function () {
  console.log("Server running on 3000");
});
