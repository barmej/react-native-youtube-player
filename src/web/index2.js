//import("./dist/index.html");

import fs from "fs";

// Read contents as a string
const string = fs.readFileSync(__dirname + "/dist/index.html", "utf8");

export default string;
