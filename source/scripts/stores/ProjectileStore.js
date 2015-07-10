var ProjectileStore = Phlux.createStore({
	update: function(tick) {
		for(var index in this.data) {
			var datum = this.data[index]
			datum.age = datum.age + tick || tick
			datum.position.x += datum.velocity.x
            datum.maxdistance -= datum.velocity.x
            if(datum.maxdistance <= 0) {
                delete this.data[index]
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
