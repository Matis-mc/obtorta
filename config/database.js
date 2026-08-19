const mongoose = require('mongoose');

const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://coffee_app:1234@coffeeapp.pftlkzu.mongodb.net/';
const connections = new Map();

const databaseNames = {
    auth: process.env.MONGODB_DB_AUTH || 'auth',
    coffee: process.env.MONGODB_DB_COFFEE || 'coffee',
    herd: process.env.MONGODB_DB_HERD || 'herd',
    coal: process.env.MONGODB_DB_COAL || 'coal',
    commons: process.env.MONGODB_DB_COMMONS || 'commons'
};

const getDatabaseUri = databaseName => {
    const [uriWithoutQuery, query] = mongoUri.split('?');
    const uri = `${uriWithoutQuery.replace(/\/$/, '')}/${databaseName}`;
    return query ? `${uri}?${query}` : uri;
};

const getConnection = domain => {
    if (!databaseNames[domain]) {
        throw new Error(`Unknown MongoDB domain: ${domain}`);
    }

    if (!connections.has(domain)) {
        const connection = mongoose.createConnection(getDatabaseUri(databaseNames[domain]), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        connection.on('error', error => {
            console.error(`MongoDB connection failed for ${domain}: ${error.message}`);
        });
        connections.set(domain, connection);
    }

    return connections.get(domain);
};

const connectDatabases = () => Promise.all(
    Object.keys(databaseNames).map(domain => getConnection(domain).asPromise())
);

module.exports = {getConnection, connectDatabases};