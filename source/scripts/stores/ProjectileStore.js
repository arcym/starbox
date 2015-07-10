var StarshipPartStore = require("<scripts>/stores/StarshipPartStore")

var ProjectileStore = Phlux.createStore({
	update: function(tick) {
		for(var index in this.data) {
			var projectile = this.data[index]
			projectile.age = projectile.age + tick || tick
			projectile.position.x += projectile.velocity.x
            projectile.maxdistance -= projectile.velocity.x
            if(projectile.maxdistance <= 0) {
                delete this.data[index]
                continue
            }
            var x = Math.floor(projectile.position.x)
            var y = Math.floor(projectile.position.y)
            if(StarshipPartStore.collides(x, y)) {
                delete this.data[index]
                continue
            }
		}
		this.trigger()
	},
	addProjectile: function(projectile) {
		this.count = this.count + 1 || 0
        projectile.maxdistance = projectile.maxdistance || WIDTH
		this.data[this.count] = projectile
	}
})

module.exports = ProjectileStore
