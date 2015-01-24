var LoopActions = require("<scripts>/actions/LoopActions")
var StarshipActions = require("<scripts>/actions/StarshipActions")
var PlayerStarshipStore = require("<scripts>/stores/PlayerStarshipStore")

var acceleration = 2
var deacceleration = 1
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
            modules: [
                {
                    type: "hull",
                    position: {
                        x: -1,
                        y: 0
                    }
                }
            ]
        },
        1: {
            key: 1,
            position: {
                x: -3,
                y: -3
            },
            velocity: {
                x: 0,
                y: 0
            },
            modules: []
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
    onStarshipPushNorth: function(tick) {
        var key = PlayerStarshipStore.getKey()
        this.data[key].velocity.y -= acceleration * tick
        if(this.data[key].velocity.y < -maximum_velocity) {
            this.data[key].velocity.y = -maximum_velocity
        }
    },
    onStarshipPushSouth: function(tick) {
        var key = PlayerStarshipStore.getKey()
        this.data[key].velocity.y += acceleration * tick
        if(this.data[key].velocity.y > +maximum_velocity) {
            this.data[key].velocity.y = +maximum_velocity
        }
    },
    onStarshipPushWest: function(tick) {
        var key = PlayerStarshipStore.getKey()
        this.data[key].velocity.x -= acceleration * tick
        if(this.data[key].velocity.x < -maximum_velocity) {
            this.data[key].velocity.x = -maximum_velocity
        }
    },
    onStarshipPushEast: function(tick) {
        var key = PlayerStarshipStore.getKey()
        this.data[key].velocity.x += acceleration * tick
        if(this.data[key].velocity.x > +maximum_velocity) {
            this.data[key].velocity.x = +maximum_velocity
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
