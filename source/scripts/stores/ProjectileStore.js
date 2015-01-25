var LoopActions = require("<scripts>/actions/LoopActions")
var StarshipStore = require("<scripts>/stores/StarshipStore")
var ProjectileActions = require("<scripts>/actions/ProjectileActions")

var ProjectileStore = Reflux.createStore({
    data: [
    ],
    getData: function() {
        return this.data
    },
    listenables: [
        ProjectileActions,
        LoopActions
    ],
    onProjectileFire: function(starship) {
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
    onTick: function(tick) {
        var starships = StarshipStore.getData()
        for(var i = 0; i < this.data.length; i++) {
            var projectile = this.data[i]
            projectile.position.x += projectile.velocity.x * tick
            projectile.position.y += projectile.velocity.y * tick

            for(var j = 0; j < starships.length; j++) {
                var starship = starships[j]
                if(projectile.position.x < starship.position.x + 0.5
                && projectile.position.x > starship.position.x - 0.5
                && projectile.position.y < starship.position.y + 0.5
                && projectile.position.y > starship.position.y + 0.5) {
                    console.log("HIT")
                }
            }
        }
        this.retrigger()
    }
})

module.exports = ProjectileStore
