var Shapes = require("<scripts>/data/Shapes")

var StarshipPartStore = Phlux.createStore({
    data: {
        "0": {
            shape: Shapes["dot-1"],
            position: {x: 8, y: 2},
            color: "#346630"
        },
        "1": {
            shape: Shapes["spoon-2"],
            position: {x: 16, y: 13},
            color: "#346630"
        },
        "2": {
            shape: Shapes["junction-1"],
            position: {x: 23, y: 12},
            color: "#346630"
        },
        "3": {
            shape: Shapes["cross-1"],
            position: {x: 32, y: 4},
            color: "#346630"
        },
        "4": {
            shape: Shapes["spoon-4"],
            position: {x: 45, y: 9},
            color: "#346630"
        },
        "4.5": {
            shape: Shapes["dot-1"],
            position: {x: 47, y: 13},
            color: "#346630"
        },
        "5": {
            shape: Shapes["stairs-4"],
            position: {x: 58, y: 3},
            color: "#346630"
        },
        "6": {
            shape: Shapes["thumbsup-6"],
            position: {x: 62, y: 13},
            color: "#346630"
        },
        "7": {
            shape: Shapes["longspoon-2"],
            position: {x: 78, y: HEIGHT / 2},
            color: "#346630"
        },
        "8": {
            shape: Shapes["longspoon-3"],
            position: {x: 80, y: HEIGHT / 2},
            color: "#346630"
        }
    }
})

module.exports = StarshipPartStore
