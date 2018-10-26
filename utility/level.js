/* ===== Persist data with LevelDB ===============================
|  Learn more: level: https://github.com/Level/level              |
|  =============================================================*/

const level = require('level');
const chainDB = './chaindata';
const db = level(chainDB);


function getKey(key) {
    return new Promise((resolve, reject) => {
        db.get(key, function(err, value) {
            if (err)
                reject(err);
            else
                resolve(value);
        });
    });
}


function addData(key, data) {
    return db.put(key, data);
}


// Get block from levelDB with given height
function getBlock(height) {
    return getKey(height);
}


// Add block data to levelDB at given height
function addBlock(height, data) {
    return addData(height, data);
}


// Get length of the blockChain from levelDB
function getChainLength() {
    return new Promise((resolve, reject) => {
        let chainLength = 0;

        db.createKeyStream().on('data', function(data) {
            chainLength++;
        }).on('error', function(err) {
            console.log('Unable to read key stream!', err);
            reject(err);
        }).on('close', function() {
            resolve(chainLength);
        });
    });
}


module.exports = {
    getBlock,
    addBlock,
    getChainLength,
}
