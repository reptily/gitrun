const fs = require('fs');
const path = require('path');
const pathDB = path.resolve(__dirname, '../.db/data.json');

class DB {

    constructor() {
        this.data = false;

        try {
            if (fs.existsSync(pathDB) === false) {
                this.data = {};
                fs.writeFileSync(pathDB, JSON.stringify({project:[]}));
            } else {
                let fileDB = fs.readFileSync(pathDB).toString();
                this.data = JSON.parse(fileDB);
            }
        } catch(err) {
            console.error(err);
        }
    }

    getData() {
        return this.data;
    }

    sync() {
        fs.writeFileSync(pathDB, JSON.stringify(this.getData()));
    }

    create(collection, obj) {
        this.data[collection].push(obj);
        this.sync();
    }

    delete(collection, id) {
        this.data[collection].splice(id, 1);
        this.sync();
        return this.getCollection(collection);
    }

    update(collection, id, obj) {
        this.data[collection][id] = obj;
        this.sync();
        return this.getCollection(collection);
    }

    getCollection(collection) {
        return this.getData()[collection];
    }
}

module.exports = DB;