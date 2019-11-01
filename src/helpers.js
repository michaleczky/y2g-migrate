import fs from 'fs';

function readFileAsync(fileName, options = {}) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8', (error, data) => {
            if (error) reject(error);
            resolve(data);
        })
    });
}

function readJSONAsync(fileName) {
    return readFileAsync(fileName).then((data) => {
        return JSON.parse(data);
    });
}

export { readFileAsync, readJSONAsync };