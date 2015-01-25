var LoopActions = require("<scripts>/actions/LoopActions")

var ProjectileStore = Reflux.createStore({
    data: [
    ],
    getData: function() {
        return this.data
    },
    addProjectile: function(x, y, r) {
        console.log(x, y, r)
        this.data.push({
            position: {
                x: x,
                y: y
            },
            rotation: r
        })
    },
    listenables: [
        LoopActions
    ],
    onTick: function(tick) {
        for(var index = 0; index < this.data.length; index++) {
            this.data[index].position.x += 0.5 * tick
        }
        this.retrigger()
    }
})

module.exports = ProjectileStore
