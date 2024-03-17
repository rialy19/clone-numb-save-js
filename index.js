const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

const dbName = 'data';

async function fetchData() {
    const client = new MongoClient(url);

    try {
        await client.connect();

        console.log("Connected to the server");

        const db = client.db(dbName);

        const collection = db.collection('users');

        const data = await collection.findOne({});
        
        console.log("Data from database:", data);

        const clonedData = deepClone(data);

        console.log("Cloned data:", clonedData);
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.close();
        console.log("Connection closed");
    }
}

function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    let clone = Array.isArray(obj) ? [] : {};

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            clone[key] = deepClone(obj[key]);
        }
    }

    return clone;
}

fetchData();
