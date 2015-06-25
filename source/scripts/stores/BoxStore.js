var Box = require("<scripts>/classes/Box")

var BoxStore = Phlux.createStore({
    data: {
        1: new Box({
            width: 2,
            height: 2,
            color: "green",
            name: "T5-623-beta",
            description: "A failed prototype of the T5-624.",
            position: {
                x: 3.5,
                y: 2.5
            }
        }),
        2: new Box({
            width: 1,
            height: 1,
            color: "red",
            name: "The Big Bang",
            description: "A kinetic missile launcher from Solphi 6",
            position: {
                x: 5.5,
                y: 5.5
            }
        }),
        3: new Box({
            width: 1,
            height: 1.5,
            color: "blue",
            name: "Neo Tylsic Plating",
            description: "Made from shrapnel of old tylsic ships.",
            position: {
                x: 8.5,
                y: 4.5
            }
        })
    }
})

module.exports = BoxStore
