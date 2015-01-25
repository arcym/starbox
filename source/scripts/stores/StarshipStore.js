var LoopActions = require("<scripts>/actions/LoopActions")
var StarshipActions = require("<scripts>/actions/StarshipActions")
var PlayerStarshipStore = require("<scripts>/stores/PlayerStarshipStore")

var acceleration = 2
var deacceleration = 0.25
var maximum_velocity = 3

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
            modules: [
                {
                    category: "hull",
                    affiliation: "federation",
                    position: {
                        x: -1,
                        y: 0
                    }
                },
                {
                    category: "hull",
                    affiliation: "federation",
                    position: {
                        x: 1,
                        y: 0
                    }
                },
                {
                    category: "hull",
                    affiliation: "federation",
                    position: {
                        x: 0,
                        y: -1
                    }
                },
                {
                    category: "hull",
                    affiliation: "federation",
                    position: {
                        x: 0,
                        y: 1
                    }
                },
                {
                    category: "turret",
                    affiliation: "federation",
                    position: {
                        x: 0,
                        y: -2
                    }
                },
                {
                    category: "engine",
                    affiliation: "federation",
                    position: {
                        x: -1,
                        y: 1
                    }
                },
                {
                    category: "engine",
                    affiliation: "federation",
                    position: {
                        x: 1,
                        y: 1
                    }
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
            modules: [
                {
                    category: "hull",
                    affiliation: "rebellion",
                    position: {
                        x: 0,
                        y: 1
                    }
                },
                {
                    category: "hull",
                    affiliation: "rebellion",
                    position: {
                        x: 0,
                        y: -1
                    }
                },
                {
                    category: "turret",
                    affiliation: "rebellion",
                    position: {
                        x: 0,
                        y: -2
                    }
                },
                {
                    category: "engine",
                    affiliation: "rebellion",
                    position: {
                        x: 0,
                        y: 2
                    }
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
            rotation: 12.5 + 90 + 45,
            affiliation: "ancient",
            modules: [
                {
                    category: "hull",
                    affiliation: "ancient",
                    position: {
                        x: -1,
                        y: 0
                    }
                },
                {
                    category: "hull",
                    affiliation: "ancient",
                    position: {
                        x: 1,
                        y: 0
                    }
                },
                {
                    category: "turret",
                    affiliation: "ancient",
                    position: {
                        x: -1,
                        y: -1
                    }
                },
                {
                    category: "turret",
                    affiliation: "ancient",
                    position: {
                        x: 1,
                        y: -1
                    }
                },
                {
                    category: "engine",
                    affiliation: "ancient",
                    position: {
                        x: -1,
                        y: 1
                    }
                },
                {
                    category: "engine",
                    affiliation: "ancient",
                    position: {
                        x: 1,
                        y: 1
                    }
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
            rotation: 0,
            affiliation: "locust",
            modules: [
                {
                    category: "hull",
                    affiliation: "locust",
                    position: {
                        x: -1,
                        y: 0
                    }
                },
                {
                    category: "hull",
                    affiliation: "locust",
                    position: {
                        x: -1,
                        y: -1
                    }
                },
                {
                    category: "hull",
                    affiliation: "locust",
                    position: {
                        x: -1,
                        y: 1
                    }
                },
                {
                    category: "hull",
                    affiliation: "locust",
                    position: {
                        x: 1,
                        y: 0
                    }
                },
                {
                    category: "hull",
                    affiliation: "locust",
                    position: {
                        x: 1,
                        y: -1
                    }
                },
                {
                    category: "hull",
                    affiliation: "locust",
                    position: {
                        x: 1,
                        y: 1
                    }
                },
                {
                    category: "turret",
                    affiliation: "locust",
                    position: {
                        x: -1,
                        y: -2
                    }
                },
                {
                    category: "turret",
                    affiliation: "locust",
                    position: {
                        x: 1,
                        y: -2
                    }
                },
                {
                    category: "engine",
                    affiliation: "locust",
                    position: {
                        x: -1,
                        y: 2
                    }
                },
                {
                    category: "engine",
                    affiliation: "locust",
                    position: {
                        x: 1,
                        y: 2
                    }
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
        this.data[key].rotation += 45 * tick
        if(this.data[key].rotation > 360) {
            this.data[key].rotation -= 360
        }
    },
    onStarshipMove: function(key, dx, dy) {
        this.data[key].position.x += dx
        this.data[key].position.y += dy
    },
    onTick: function(tick) {
        var key = PlayerStarshipStore.getKey()

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
    }
})

module.exports = StarshipStore
