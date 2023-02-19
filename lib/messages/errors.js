const ErrorMsgs = {
  NOT_MONGOOSE_DB:
    "The constructor's optional param supports mongodb database only. To make use of another database then call the function in the index.js or index.ts file like a function Example:`sequelize.sync() ` for mysql. Visit <https://kamounation.org/dolphjs>",
};

module.exports.ErrorMsgs = ErrorMsgs;
