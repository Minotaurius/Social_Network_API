const mongoose = require('mongoose');
const is_production = process.env.NODE_ENV

const url = is_production ? "mongodb+srv://minotaurius:password12345@cluster0.pfnlxmf.mongodb.net/?retryWrites=true&w=majority" : "mongodb://localhost:27017/";
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = mongoose.connection;