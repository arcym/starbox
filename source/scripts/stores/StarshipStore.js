var Shapes = require("<scripts>/data/Shapes")
var ProjectileStore = require("<scripts>/stores/ProjectileStore")

var StarshipStore = Phlux.createStore({
    data: {
        0: {
            position: {
                x: WIDTH / 4,
                y: HEIGHT / 2
            },
            parts: [
                {
                    shape: Shapes["triangle-1"],
                    position: {x: 0, y: 0},
                    color: "#C00"
                },
                {
                    shape: Shapes["quark-4"],
                    position: {x: -2, y: -1},
                    color: "#FC0"
                }
            ],
            update: function() {
                if(Keyb.isDown("<space>")) {
                    ProjectileStore.addProjectile({
                        dimensions: {
                			x: 0.75,
                			y: 0.375,
                        },
                        position: {
                            x: this.position.x + 1.25 + 0.375,
                            y: this.position.y
                        },
                        velocity: {
                            x: 0.25,
                            y: 0
                        }
                    })
                }
            }
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
