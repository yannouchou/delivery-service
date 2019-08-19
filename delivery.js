const graph = require("./graph/index.js");
const _ = require("lodash");

const myDistances = {
    "A": {"B":1,"C":4,"D":10},
    "B": {"E":3},
    "C": {"D":4,"F":2},
    "D": {"E":1},
    "E": {"A":2,"B":3},
    "F": {"D":1},
};


let myGraph = new graph(myDistances);

getRouteCost = (route) => {
    let cost = myGraph.routeCost(route);
    console.log(cost === undefined ? 'No Such Route' : cost);
}

getShortestRoute = (a,b) => {
    let route = myGraph.shortestRoute(a,b);
    console.log(route ? route.join('') + ' (' + myGraph.routeCost(route) + ')' : `Could not find a route from ${a} to ${b}`);
}

getAllRoutes = (a,b,max,canRepeat) => {
    let routes = myGraph.allRoutes(a,b,max,canRepeat);
    console.log(`Found ${routes.length} matching routes:`);
    routes.forEach(route => console.log(route.join('')));
}

require('yargs')
    .usage('$0 <cmd> [args]','Usage')

    // Compute route costs
    .command('routecost <route>', 'Computes the total distance of a route', (yargs) => {
        yargs.positional('route', {
            type: 'string',
            required: true,
            coerce: _.toUpper,
            describe: 'route path in format ABCD'
        })
    },
    function (argv) {
        getRouteCost(argv.route);
    })

    // Compute shortest route
    .command('shortest <from> <to>', 'Computes the shortest route between 2 points', (yargs) => {
        yargs.positional('from', {
            type: 'string',
            required: true,
            coerce: _.toUpper,
            describe: 'FROM node name'
        }).positional('to', {
            type: 'string',
            required: true,
            coerce: _.toUpper,
            describe: 'TO node name'
        })
    },
    function (argv) {
        getShortestRoute(argv.from, argv.to);
    })

    // Show all routes
    .command('routes <from> <to> [maxHops] [canRepeat]', 'Computes all possible routes', (yargs) => {
        yargs.positional('from', {
            type: 'string',
            required: true,
            coerce: _.toUpper,
            describe: 'FROM node name'
        }).positional('to', {
            type: 'string',
            required: true,
            coerce: _.toUpper,
            describe: 'TO node name'
        }).positional('maxHops', {
            type: 'number',
            describe: 'Max number of hops'
        }).positional('canRepeat', {
            type: 'boolean',
            describe: 'Allow revisiting previous nodes?'
        })
    },
    function (argv) {
        getAllRoutes(argv.from, argv.to, argv.maxHops, argv.canRepeat);
    })
    
    .help()
    .argv;