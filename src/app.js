import yargs from "yargs";

const options = yargs
    .usage('y2g-migrate')
    .option('i', {
        alias: 'interval',
        describe: 'Provide the interval',
        type: 'date',
    })
    .argv;

console.log("Hello!");
