var StarshipStore = Phlux.createStore({
    data: {
        me: {
            position: {
                x: 3,
                y: 3,
                sx: 0,
                sy: 0
            },
            velocity: {
                x: 0,
                y: 0
            },
            maxvelocity: 5,
            acceleration: 30,
            deceleration: 15,
            configuration: {
                autodeceleration: true,
                maximumresponsivity: true
            },
            parts: {
                //?!
            },
            update: function(tick) {
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
                
                if(this.configuration.autodeceleration) {
                    this.decelerate(tick)
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
                if(this.position.x < 0.5) {
                    this.position.x = 0.5
                } else if(this.position.x > WIDTH - 0.5) {
                    this.position.x = WIDTH - 0.5
                } if(this.position.y < 0.5) {
                    this.position.y = 0.5
                } else if(this.position.y > HEIGHT - 0.5) {
                    this.position.y = HEIGHT - 0.5
                }
            }
        }
    },
    update: function(tick) {
        for(var key in this.data) {
            this.data[key].update(tick)
        }
    }
})

module.exports = StarshipStore
