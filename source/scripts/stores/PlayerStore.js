var LoopActions = require("<scripts>/actions/LoopActions")
var PlayerActions = require("<scripts>/actions/PlayerActions")

var acceleration = 1
var deacceleration = 0.35
var maximum_velocity = 3

var PlayerStore = Reflux.createStore({
    data: [
        {
            position: {
                x: 3,
                y: 3
            },
            velocity: {
                x: 0,
                y: 0
            }
        }
    ],
    getData: function() {
        return this.data
    },
    listenables: [
        LoopActions,
        PlayerActions
    ],
    onPlayerMoveNorth: function(tick) {
        this.data[0].velocity.y -= acceleration * tick
        if(this.data[0].velocity.y < -maximum_velocity) {
            this.data[0].velocity.y = -maximum_velocity
        }
    },
    onPlayerMoveSouth: function(tick) {
        this.data[0].velocity.y += acceleration * tick
        if(this.data[0].velocity.y > +maximum_velocity) {
            this.data[0].velocity.y = +maximum_velocity
        }
    },
    onPlayerMoveWest: function(tick) {
        this.data[0].velocity.x -= acceleration * tick
        if(this.data[0].velocity.x < -maximum_velocity) {
            this.data[0].velocity.x = -maximum_velocity
        }
    },
    onPlayerMoveEast: function(tick) {
        this.data[0].velocity.x += acceleration * tick
        if(this.data[0].velocity.x > +maximum_velocity) {
            this.data[0].velocity.x = +maximum_velocity
        }
    },
    onPlayerMove: function(dx, dy) {
        this.data[0].position.x += dx
        this.data[0].position.y += dy
    },
    onTick: function(tick) {
        var datum = this.data[0]
        var dx = datum.velocity.x * tick
        var dy = datum.velocity.y * tick
        PlayerActions.PlayerMove(dx, dy)

        if(datum.velocity.x < 0) {
            datum.velocity.x += deacceleration * tick
            if(datum.velocity.x > 0) {
                datum.velocity.x = 0
            }
        }
        else if(datum.velocity.x > 0) {
            datum.velocity.x -= deacceleration * tick
            if(datum.velocity.x < 0) {
                datum.velocity.x = 0
            }
        }
        if(datum.velocity.y < 0) {
            datum.velocity.y += deacceleration * tick
            if(datum.velocity.y > 0) {
                datum.velocity.y = 0
            }
        }
        else if(datum.velocity.y > 0) {
            datum.velocity.y -= deacceleration * tick
            if(datum.velocity.y < 0) {
                datum.velocity.y = 0
            }
        }
        this.retrigger()
    }
})

module.exports = PlayerStore
