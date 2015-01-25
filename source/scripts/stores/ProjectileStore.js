var LoopActions = require("<scripts>/actions/LoopActions")

var ProjectileStore = Reflux.createStore({
    data: [
    ],
    getData: function() {
        return this.data
    },
    addProjectile: function(starship) {
        this.data.push({
            position: {
                x: starship.position.x,
                y: starship.position.y
            },
            velocity: {
                x: starship.velocity.x + (10 * Math.sin(starship.rotation * (Math.PI/180))),
                y: starship.velocity.y - (10 * Math.cos(starship.rotation * (Math.PI/180)))
            },
            rotation: starship.rotation
        })
    },
    listenables: [
        LoopActions
    ],
    onTick: function(tick) {
        for(var index = 0; index < this.data.length; index++) {
            this.data[index].position.x += this.data[index].velocity.x * tick
            this.data[index].position.y += this.data[index].velocity.y * tick
        }
        this.retrigger()
    }
})

module.exports = ProjectileStore
