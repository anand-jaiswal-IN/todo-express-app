const username = 'anand';
const passward = 'h5C2gdQM0qMJDYtu';
const atlasHost = `mongodb+srv://${username}:${passward}@demopurpose.skeokef.mongodb.net/`;

const localhost = `mongodb://127.0.0.1/`

const databaseName = `my_db`;

const connectionAt = localhost+databaseName;

module.exports = connectionAt;

