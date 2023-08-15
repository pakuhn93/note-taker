const fs = require('fs');
// using the advice i received to use util so i can wait for the data to be loaded / written
const util = require('util');
// didn't think i would need this but it makes creating an id much easier
const uuidv1 = require('uuid/v1');

// turns fs readFile and writeFile into promise statements so JavaScript will actually wait for them read/write the file
const awaitRead = util.promisify(fs.readFile);
const awaitWrite = util.promisify(fs.writeFile);

// create a class that holds functions for us to use in our program
class Database {

    // read the file | returns the file as a string
    read(){
        return awaitRead('db/db.json', 'utf8');
    }

    // write the file 
    write(data){
        return awaitWrite('db/db.json', JSON.stringify(data));
    }

    // grabs all of our data and returns it as an array
    getData(){
        return this.read().then((data) => {
            let myData;

            try {
                myData = [].concat(JSON.parse(data));
            } catch (err) {
                console.log("The following error has occurred...: ", err);
                myData = [];
            }
            return myData;
        })
    }

    // basically, we get the data we want to add, then write it to the file, then return what the new data looks like
    addData(data){
        // this is the format of our data in db.json
        const { title, text } = data;

        // uuidv1 returns a string to be used as a unique id for this piece of data
        const newData = { title, text, id: uuidv1() };

        // get all the data, THEN append newData to the data we grabbed, THEN write the data down in the file, THEN make sure the value of the return is newData
        return this.getData()
            .then ((data) => [...data, newData])
            .then ((updatedData) => this.write(updatedData))
            .then (() => newData);
    }
}

// export as a new object so we don't need to create one later
module.exports = new Database();