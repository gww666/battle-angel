const path = require("path");
const {copy} = require("./server-util.js");
let o = path.resolve(__dirname, "../store/index.js");
let d = path.resolve(__dirname, "../copy-test/index.js");
copy(o, d);