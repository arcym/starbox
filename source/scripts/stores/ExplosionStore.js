var StarStore = require("<scripts>/stores/StarStore")

var ExplosionSmoke = function(protoexplosion) {
    for(var key in protoexplosion) {
        this[key] = protoexplosion[key]
    }
    
    this.maxtime = this.time
}

ExplosionSmoke.prototype.render = function() {
    var easeInQuart = function (t) { return t*t*t*t }
    return {
        "position": "absolute",
        "backgroundColor": this.color || "#888",
        "width": this.width + "em",
        "height": this.height + "em",
        "top": this.position.y + "em",
        "left": this.position.x + "em",
        "opacity": easeInQuart(this.time / this.maxtime),
        "transform": "rotate(" + this.position.r + "deg)",
        "transformOrigin": "50% 50%",
    }
}

ExplosionSmoke.prototype.update = function(tick) {
    this.time -= tick
    if(this.time <= 0) {
        delete ExplosionStore.data[this.key]
    }
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.position.r += this.velocity.r
}

var ExplosionStore = Phlux.createStore({
    boom: function(position, part) {
        for(var index in part.shape) {
            var partpart = part.shape[index]
            for(var i = 0; i < 4; i++) {
                var key = ShortID.generate()
                this.data[key] = new ExplosionSmoke({
                    "width": (Math.random() * 0.6) + 0.4,
                    "height": (Math.random() * 0.6) + 0.4,
                    "time": 0.5,
                    "color": "#888",
                    "position": {
                        "x": part.position.x + partpart.x + (Math.random() - 0.5),
                        "y": part.position.y + partpart.y + (Math.random() - 0.5),
                        "r": Math.random() * 360,
                    },
                    "velocity": {
                        "x": (Math.random() - 0.5) * 0.0015,
                        "y": (Math.random() - 0.5) * 0.0015,
                        "r": 0,
                    },
                    "key": key,
                })
            }
            for(var i = 0; i < 4; i++) {
                var key = ShortID.generate()
                var vx = (Math.random() - 0.5) * 0.5
                var vy = (Math.random() - 0.5) * 0.5
                this.data[key] = new ExplosionSmoke({
                    "width": 0.05,
                    "height": (Math.random() * 0.4) + 0.2,
                    "time": 0.5,
                    "color": StarStore.getRandomColor(),
                    "position": {
                        "x": part.position.x + partpart.x + (Math.random() - 0.5),
                        "y": part.position.y + partpart.y + (Math.random() - 0.5),
                        "r": Math.random() * 360,
                    },
                    "velocity": {
                        "x": vx,
                        "y": vy,
                    },
                    "key": key,
                })
            }
        }
        this.trigger()
    },
    update: function(tick) {
        for(var key in this.data) {
            var explosion = this.data[key]
            explosion.update(tick)
        }
        this.trigger()
    }
})

module.exports = ExplosionStore
