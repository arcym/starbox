var LoopActions = require("<scripts>/actions/LoopActions")
var StarshipActions = require("<scripts>/actions/StarshipActions")
var PlayerStarshipStore = require("<scripts>/stores/PlayerStarshipStore")
var ProjectileActions = require("<scripts>/actions/ProjectileActions")

var acceleration = 2
var deacceleration = 0.25
var maximum_velocity = 3

var engine_sound = new Audio("./assets/sounds/engine.wav")
engine_sound.play()

var StarshipStore = Reflux.createStore({
    data: {
        0: {
            key: 0,
            position: {
                x: 0,
                y: 0
            },
            velocity: {
                x: 0,
                y: 0
            },
            rotation: 0,
            affiliation: "federation",
            cooldown: 0,
            damage: 4,
            modules: [
                {
                    category: "hull",
                    affiliation: "federation",
                    position: {
                        x: -1,
                        y: 0
                    },
                    damage: 3
                },
                {
                    category: "hull",
                    affiliation: "federation",
                    position: {
                        x: 1,
                        y: 0
                    },
                    damage: 3
                },
                {
                    category: "hull",
                    affiliation: "federation",
                    position: {
                        x: 0,
                        y: -1
                    },
                    damage: 3
                },
                {
                    category: "hull",
                    affiliation: "federation",
                    position: {
                        x: 0,
                        y: 1
                    },
                    damage: 3
                },
                {
                    category: "turret",
                    affiliation: "federation",
                    position: {
                        x: 0,
                        y: -2
                    },
                    damage: 3
                },
                {
                    category: "engine",
                    affiliation: "federation",
                    position: {
                        x: -1,
                        y: 1
                    },
                    damage: 3
                },
                {
                    category: "engine",
                    affiliation: "federation",
                    position: {
                        x: 1,
                        y: 1
                    },
                    damage: 3
                }
            ]
        },
        1: {
            key: 1,
            position: {
                x: -7,
                y: -7
            },
            velocity: {
                x: 0,
                y: 0
            },
            rotation: -12.5 - 90 - 45,
            affiliation: "rebellion",
            damage: 4,
            modules: [
                {
                    category: "hull",
                    affiliation: "rebellion",
                    position: {
                        x: 0,
                        y: 1
                    },
                    damage: 3
                },
                {
                    category: "hull",
                    affiliation: "rebellion",
                    position: {
                        x: 0,
                        y: -1
                    },
                    damage: 3
                },
                {
                    category: "turret",
                    affiliation: "rebellion",
                    position: {
                        x: 0,
                        y: -2
                    },
                    damage: 3
                },
                {
                    category: "engine",
                    affiliation: "rebellion",
                    position: {
                        x: 0,
                        y: 2
                    },
                    damage: 3
                }
            ]
        },
        2: {
            key: 2,
            position: {
                x: 7,
                y: 7
            },
            velocity: {
                x: 0,
                y: 0
            },
            rotation: 0,
            affiliation: "ancient",
            damage: 4,
            modules: [
                {
                    category: "hull",
                    affiliation: "ancient",
                    position: {
                        x: -1,
                        y: 0
                    },
                    damage: 3
                },
                {
                    category: "hull",
                    affiliation: "ancient",
                    position: {
                        x: 1,
                        y: 0
                    },
                    damage: 3
                },
                {
                    category: "turret",
                    affiliation: "ancient",
                    position: {
                        x: -1,
                        y: -1
                    },
                    damage: 3
                },
                {
                    category: "turret",
                    affiliation: "ancient",
                    position: {
                        x: 1,
                        y: -1
                    },
                    damage: 3
                },
                {
                    category: "engine",
                    affiliation: "ancient",
                    position: {
                        x: -1,
                        y: 1
                    },
                    damage: 3
                },
                {
                    category: "engine",
                    affiliation: "ancient",
                    position: {
                        x: 1,
                        y: 1
                    },
                    damage: 3
                }
            ]
        },
        3: {
            key: 3,
            position: {
                x: -7,
                y: 7
            },
            velocity: {
                x: 0,
                y: 0
            },
            rotation: 45,
            affiliation: "locust",
            damage: 4,
            modules: [
                {
                    category: "hull",
                    affiliation: "locust",
                    position: {
                        x: -1,
                        y: 0
                    },
                    damage: 3
                },
                {
                    category: "hull",
                    affiliation: "locust",
                    position: {
                        x: 1,
                        y: 0
                    },
                    damage: 3
                },
                {
                    category: "turret",
                    affiliation: "locust",
                    position: {
                        x: -1,
                        y: -1
                    },
                    damage: 3
                },
                {
                    category: "turret",
                    affiliation: "locust",
                    position: {
                        x: 1,
                        y: -1
                    },
                    damage: 3
                },
                {
                    category: "engine",
                    affiliation: "locust",
                    position: {
                        x: -1,
                        y: 1
                    },
                    damage: 3
                },
                {
                    category: "engine",
                    affiliation: "locust",
                    position: {
                        x: 1,
                        y: 1
                    },
                    damage: 3
                }
            ]
        }
    },
    getData: function() {
        return this.data
    },
    getPlayerData: function() {
        return this.data[PlayerStarshipStore.getKey()]
    },
    listenables: [
        LoopActions,
        StarshipActions
    ],
    onStarshipAccelerate: function(tick) {
        var key = PlayerStarshipStore.getKey()
        this.data[key].velocity.x += Math.sin(this.data[key].rotation * (Math.PI/180))
         this.data[key].velocity.y += Math.cos(this.data[key].rotation * (Math.PI/180)) * -1

        if(this.data[key].velocity.x < -maximum_velocity) {
            this.data[key].velocity.x = -maximum_velocity
        } else if(this.data[key].velocity.x > maximum_velocity) {
            this.data[key].velocity.x = maximum_velocity
        } if(this.data[key].velocity.y < -maximum_velocity) {
            this.data[key].velocity.y = -maximum_velocity
        } else if(this.data[key].velocity.y > maximum_velocity) {
            this.data[key].velocity.y = maximum_velocity
        }

            engine_sound.play()
    },
    onStarshipDeaccelerate: function(tick) {
        var key = PlayerStarshipStore.getKey()

        if(this.data[key].velocity.x > 0) {
            this.data[key].velocity.x -= acceleration * tick
        } else if(this.data[key].velocity.x < 0) {
            this.data[key].velocity.x += acceleration * tick
        } if(this.data[key].velocity.y > 0) {
            this.data[key].velocity.y -= acceleration * tick
        } else if(this.data[key].velocity.y < 0) {
            this.data[key].velocity.y += acceleration * tick
        }
    },
    onStarshipRotateLeft: function(tick) {
        var key = PlayerStarshipStore.getKey()
        this.data[key].rotation -= 45*1.5 * tick
        if(this.data[key].rotation < 0) {
            this.data[key].rotation += 360
        }
    },
    onStarshipRotateRight: function(tick) {
        var key = PlayerStarshipStore.getKey()
        this.data[key].rotation += 45*1.5 * tick
        if(this.data[key].rotation > 360) {
            this.data[key].rotation -= 360
        }
    },
    onStarshipFireTurrets: function(tick) {
        var key = PlayerStarshipStore.getKey()
        if(this.data[key].cooldown <= 0) {
            this.data[key].cooldown = 0.5
            var modules = this.data[key].modules
            for(var index = 0; index < modules.length; index++) {
                var module = modules[index]
                if(module.category == "turret") {
                    var x = module.position.x
                    var y = module.position.y
                    var r = Math.atan2(y, x) + (Math.PI / 2)
                    r += this.data[key].rotation * (Math.PI/180)
                    var m = Math.sqrt(x * x + y * y)
                    x = m * Math.sin(r)
                    y = m * Math.cos(r) * -1
                    x += this.data[key].position.x
                    y += this.data[key].position.y
                    ProjectileActions.AddProjectile(this.data[key], x, y)
                }
            }
        }
    },
    onStarshipMove: function(key, dx, dy) {
        this.data[key].position.x += dx
        this.data[key].position.y += dy
    },
    onTick: function(tick) {
        var key = PlayerStarshipStore.getKey()

        this.data[key].cooldown -= tick

        var dx = this.data[key].velocity.x * tick
        var dy = this.data[key].velocity.y * tick
        StarshipActions.StarshipMove(key, dx, dy)

        if(this.data[key].velocity.x < 0) {
            this.data[key].velocity.x += deacceleration * tick
            if(this.data[key].velocity.x > 0) {
                this.data[key].velocity.x = 0
            }
        }
        else if(this.data[key].velocity.x > 0) {
            this.data[key].velocity.x -= deacceleration * tick
            if(this.data[key].velocity.x < 0) {
                this.data[key].velocity.x = 0
            }
        }
        if(this.data[key].velocity.y < 0) {
            this.data[key].velocity.y += deacceleration * tick
            if(this.data[key].velocity.y > 0) {
                this.data[key].velocity.y = 0
            }
        }
        else if(this.data[key].velocity.y > 0) {
            this.data[key].velocity.y -= deacceleration * tick
            if(this.data[key].velocity.y < 0) {
                this.data[key].velocity.y = 0
            }
        }
        
        this.retrigger()
    },
    onDestroyModule: function(key) {
        console.log(key)
    },
    onDestroyStarship: function(key) {
        console.log(key)
    }
})

module.exports = StarshipStore
