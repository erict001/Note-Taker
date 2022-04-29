const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// set static folder
app.use(express.static("public"));

// import routes from route folder; will look for index first
const allRoutes = require("./routes");
app.use(allRoutes);

app.listen(PORT, () => {
    console.log(`Listening at http:///localhost:${PORT}`)
});