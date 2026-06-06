const mongoose = require("mongoose");
require("dotenv").config();

let connection = Promise.resolve();
if (process.env.url) {
    connection = mongoose.connect(process.env.url);
} else {
    console.log("No MongoDB URL found in environment variables. Starting in fallback mode with local questions.");
}

module.exports = {
    connection
}