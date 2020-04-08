/**
 * file for writing and testing of algorithms to solve the problem
 * 
 * */

// define constants
testA = [1,2,3,5,10]
testB = [1,2,3,7,12,17]
testC = [1,3,3,5,8,8,9,10]

const fastestFirst = (a, b) => a - b // sorting comparator
const group = testA.sort(fastestFirst)
const secondFastest = group[1]
const sumLimit = 21


class StationModule {
    constructor(inhabitants) {
        this.inhabitants = inhabitants
    }

    removePeople(people) {
        let filtered = this.inhabitants.filter((person) => {
            return !people.includes(person)
        })
        this.inhabitants = filtered
    }

    insertPeople(people) {
        let joined = [].concat(this.inhabitants, people)
        let sorted = joined.sort(fastestFirst)
        this.inhabitants = sorted
    }
}

// define places
let peices = {
    0: new StationModule(group),
    1: new StationModule([]),

    movePeople: function (suitLocation, people) {
        this[suitLocation].removePeople(people)
        this[1 - suitLocation].insertPeople(people)
    }
}

// define variables
let suitLocation = 0 // track where the suits are
let sum = 0

// define functions
function makeMove(suitLocation, peices) {
    let leftBehind = peices[suitLocation].inhabitants
    let going = []

    if (suitLocation === 0) {
        if (peices[1].inhabitants.includes(secondFastest)) {
            // we can send the slowest two as the second fastest can bring back the suits
            going.push(leftBehind[leftBehind.length - 1])
            going.push(leftBehind[leftBehind.length - 2])
        } else {
            // we can send the 2 fastest
            going.push(leftBehind[0])
            going.push(leftBehind[1])
        }
    } else {
        // send the fastest person back with the suits
        // container inhabitants is sorted so fastest person is at index 0
        going.push(leftBehind[0])
    }

    console.dir(peices[0].inhabitants)
    peices.movePeople(suitLocation, going)
    return Math.max(...going) // time taken
}

console.dir(peices)

while (peices[0].inhabitants.length) {
    sum += makeMove(suitLocation, peices)
    suitLocation = 1 - suitLocation
}

console.log(sum)

console.dir(peices)

let test = () => {
    return sum <= sumLimit
}

console.log("test: ", test())



