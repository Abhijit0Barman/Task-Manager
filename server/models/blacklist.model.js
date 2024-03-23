const mongooes = require("mongoose");

const blacklistSchema = mongooes.Schema(
    {
        token: String,
    },
    { versionKey: false }
);

const BlacklistModel = mongooes.model("blacklisttoken", blacklistSchema);

module.exports = {
    BlacklistModel,
};
