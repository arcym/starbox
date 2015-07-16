var Shapes = require("<scripts>/data/Shapes")

var StarshipPartStore = Phlux.createStore({
    data: {
        "2": {
            shape: Shapes["junction-1"],
            position: {x: 23, y: 12},
            color: "#C00",
            damage: Shapes["junction-1"].length * 2,
            key: "2",
        },
        "3": {
            shape: Shapes["cross-1"],
            position: {x: 32, y: 4},
            color: "#FC0",
            damage: Shapes["cross-1"].length * 2,
            key: "3",
        },
        "4": {
            shape: Shapes["spoon-4"],
            position: {x: 45, y: 9},
            color: "#C00",
            damage: Shapes["spoon-4"].length * 2,
            key: "4",
        },
        "4.5": {
            shape: Shapes["dot-1"],
            position: {x: 47, y: 13},
            color: "#FC0",
            damage: Shapes["dot-1"].length * 2,
            key: "4.5",
        },
        "5": {
            shape: Shapes["stairs-4"],
            position: {x: 58, y: 3},
            color: "#C00",
            damage: Shapes["stairs-4"].length * 2,
            key: "5",
        },
        "6": {
            shape: Shapes["thumbsup-6"],
            position: {x: 62, y: 13},
            color: "#C00",
            damage: Shapes["thumbsup-6"].length * 2,
            key: "6",
        },
        "7": {
            shape: Shapes["longspoon-2"],
            position: {x: 78, y: 7},
            color: "#FC0",
            damage: Shapes["longspoon-2"].length * 2,
            key: "7",
        },
        "8": {
            shape: Shapes["longspoon-3"],
            position: {x: 80, y: 7},
            color: "#C00",
            damage: Shapes["longspoon-3"].length * 2,
            key: "8",
        }
    },
    collides: function(x, y) {
        for(var key in this.data) {
            var part = this.data[key]
            var px = Math.floor(part.position.x)
            var py = Math.floor(part.position.y)
            for(var index in part.shape) {
                var partpart = part.shape[index]
                var ppx = px + partpart.x
                var ppy = py + partpart.y
                if(x == ppx && y == ppy) {
                    return part
                }
            }
        }
        return false
    }
})

module.exports = StarshipPartStore
