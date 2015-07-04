var Box = require("<scripts>/classes/Box")

var Shapes = require("<scripts>/data/Shapes")

var StarshipStore = Phlux.createStore({
    data: {
        me: {
            position: {
                x: WIDTH / 2,
                y: HEIGHT / 2
            },
            boxes: [
                new Box({
                    shape: Shapes["quark-2"],
                    position: {
                        x: 0,
                        y: 0
                    }
                })
            ]
        }
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
