var LoopActions = require("<scripts>/actions/LoopActions")
var PlayerActions = require("<scripts>/actions/PlayerActions")
var GameStore = require("<scripts>/stores/GameStore")

var acceleration = 1
var deacceleration = 0.35
var maximum_velocity = 3

var PlayerStore = Reflux.createStore({
    data: [
        {
            id: 0,
            position: {
                x: 0,
                y: 0
            },
            velocity: {
                x: 0,
                y: 0
            }
        },
        {
            id: 1,
            position: {
                x: -8,
                y: -4.5
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
    getMyData: function() {
        var my_id = GameStore.getData().my_id
        return this.data[my_id]
    },
    listenables: [
        LoopActions,
        PlayerActions
    ],
    onPlayerPushNorth: function(tick) {
        this.data[0].velocity.y -= acceleration * tick
        if(this.data[0].velocity.y < -maximum_velocity) {
            this.data[0].velocity.y = -maximum_velocity
        }
    },
    onPlayerPushSouth: function(tick) {
        this.data[0].velocity.y += acceleration * tick
        if(this.data[0].velocity.y > +maximum_velocity) {
            this.data[0].velocity.y = +maximum_velocity
        }
    },
    onPlayerPushWest: function(tick) {
        this.data[0].velocity.x -= acceleration * tick
        if(this.data[0].velocity.x < -maximum_velocity) {
            this.data[0].velocity.x = -maximum_velocity
        }
    },
    onPlayerPushEast: function(tick) {
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
