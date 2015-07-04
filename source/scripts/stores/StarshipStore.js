var Shapes = require("<scripts>/data/Shapes")

var Starship = function(protostarship) {
    for(var key in protostarship) {
        this[key] = protostarship[key]
    }
}
var StarshipPart = function(protopart) {
    for(var key in protopart) {
        this[key] = protopart[key]
    }
}

var StarshipStore = Phlux.createStore({
    data: {
        0: new Starship({
            position: {
                x: WIDTH / 4,
                y: HEIGHT / 2
            },
            parts: [
                new StarshipPart({
                    shape: Shapes["triangle-1"],
                    position: {x: 0, y: 0},
                    color: "#C00"
                }),
                new StarshipPart({
                    shape: Shapes["quark-4"],
                    position: {x: -2, y: -1},
                    color: "#FC0"
                })
            ]
        })
    },
    update: function(tick) {
        for(var key in this.data) {
            if(this.data[key].update) {
                this.data[key].update(tick)
            }
        }
    }
})

module.exports = StarshipStore
