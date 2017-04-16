/**
 * Main file of the API. It assembles all files from src into a single export
 */
module.exports.google = require('./src/google.js')
module.exports.google.collection = require('./src/google.js').collection
module.exports.google.category = require('./src/google.js').category
module.exports.apple = require('./src/apple.js')
module.exports.apple.collection = require('./src/apple.js').collection
module.exports.apple.category = require('./src/apple.js').category
