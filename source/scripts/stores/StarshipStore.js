var Shapes = require("<scripts>/data/Shapes")
var MessageStore = require("<scripts>/stores/MessageStore")
var ExplosionStore = require("<scripts>/stores/ExplosionStore")
var ProjectileStore = require("<scripts>/stores/ProjectileStore")
var StarshipPartStore = require("<scripts>/stores/StarshipPartStore")
var StarStore = require("<scripts>/stores/StarStore")

var StarshipStore = Phlux.createStore({
    data: {
        0: {
            position: {
                x: WIDTH / 4,
                y: HEIGHT / 2,
                sx: 0
            },
            velocity: {
                x: 0,
                y: 0
            },
            maxvelocity: 9,
            acceleration: 50,
            deceleration: 50,
            configuration: {
                autodeceleration: true,
                maximumresponsivity: true
            },
            key: 0,
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
            weapon: {
                cooldown: 0,
                keyspam: true
            },
            update: function(tick) {
                this.position.sx += 7 * tick
                if(this.position.sx >= 85) {
                    MessageStore.addMessage({
                        "text": "You win!",
                        "position": {
                            "x": 0.5,
                            "y": 0.5
                        }
                    })
                }
                
                if(Keyb.isDown("W")
                || Keyb.isDown("<up>")) {
                    this.accelerate(tick, {
                        y: -1
                    })
                }
                if(Keyb.isDown("S")
                || Keyb.isDown("<down>")) {
                    this.accelerate(tick, {
                        y: +1
                    })
                }
                if(Keyb.isDown("A")
                || Keyb.isDown("<left>")) {
                    this.accelerate(tick, {
                        x: -1
                    })
                }
                if(Keyb.isDown("D")
                || Keyb.isDown("<right>")) {
                    this.accelerate(tick, {
                        x: +1
                    })
                }
                if(Keyb.isDown(".")) {
                    this.decelerate(tick)
                }

                this.translate(tick)
                
                this.weapon.cooldown -= tick
                if(Keyb.isJustDown("<space>")) {
                    if(this.weapon.keyspam == true) {
                        this.weapon.cooldown = 0
                    }
                }
                if(Keyb.isDown("<space>")) {
                    if(this.weapon.cooldown <= 0) {
                        this.weapon.cooldown = 0.05
                        ProjectileStore.addProjectile({
                            dimensions: {
                    			x: 0.75,
                    			y: 0.375,
                            },
                            position: {
                                x: this.position.sx + this.position.x + 1.5 + 0.375,
                                y: this.position.y
                            },
                            velocity: {
                                x: 0.5,
                                y: 0
                            }
                        })
                    }
                }

                if(this.configuration.autodeceleration) {
                    this.decelerate(tick)
                }
                
                var x = this.position.x + this.position.sx
                var y = this.position.y
                var collidedpart = StarshipPartStore.collides(x, y)
                if(!!collidedpart) {
                    for(var index in this.parts) {
                        var part = this.parts[index]
                        ExplosionStore.boom({"x": x, "y": y},
                        {
                            shape: part.shape,
                            position: {
                                x: x + part.position.x,
                                y: y + part.position.y,
                            },
                            color: "#FC0"
                        })
                        delete StarshipStore.data[this.key]
                        MessageStore.addMessage({
                            "text": "Whoops! You exploded! :(",
                            "size": 2,
                            "position": {
                                "x": 3,
                                "y": 6
                            }
                        })
                        StarStore.stopped = true
                        delete StarshipPartStore.data[collidedpart.key]
                        ExplosionStore.boom({"x": x, "y": y}, collidedpart)
                    }
                }
            },
            accelerate: function(tick, direction) {
                if(this.configuration.maximumresponsivity) {
                    if(direction.x != undefined) {
                        this.velocity.x = this.maxvelocity * direction.x
                    } if(direction.y != undefined) {
                        this.velocity.y = this.maxvelocity * direction.y
                    }
                } else {
                    if(direction.x != undefined) {
                        this.velocity.x += this.acceleration * direction.x * tick
                        if(this.velocity.x > this.maxvelocity) {
                            this.velocity.x = this.maxvelocity
                        } else if(this.velocity.x < -this.maxvelocity) {
                            this.velocity.x = -this.maxvelocity
                        }
                    } if(direction.y != undefined) {
                        this.velocity.y += this.acceleration * direction.y * tick
                        if(this.velocity.y > this.maxvelocity) {
                            this.velocity.y = this.maxvelocity
                        } else if(this.velocity.y < -this.maxvelocity) {
                            this.velocity.y = -this.maxvelocity
                        }
                    }
                }
            },
            decelerate: function(tick) {
                if(this.velocity.x > 0) {
                    this.velocity.x -= this.deceleration * tick
                    if(this.velocity.x < 0) {
                        this.velocity.x = 0
                    }
                } else if(this.velocity.x < 0) {
                    this.velocity.x += this.deceleration * tick
                    if(this.velocity.x > 0) {
                        this.velocity.x = 0
                    }
                } if(this.velocity.y > 0) {
                    this.velocity.y -= this.deceleration * tick
                    if(this.velocity.y < 0) {
                        this.velocity.y = 0
                    }
                } else if(this.velocity.y < 0) {
                    this.velocity.y += this.deceleration * tick
                    if(this.velocity.y > 0) {
                        this.velocity.y = 0
                    }
                }
            },
            translate: function(tick) {
                this.position.x += this.velocity.x * tick
                this.position.y += this.velocity.y * tick
                if(this.position.x < 0) {
                    this.position.x = 0
                } else if(this.position.x > WIDTH) {
                    this.position.x = WIDTH
                } if(this.position.y < 0) {
                    this.position.y = 0
                } else if(this.position.y > HEIGHT) {
                    this.position.y = HEIGHT
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
