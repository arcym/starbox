var LoopActions = require("<scripts>/actions/LoopActions")
var PlayerActions = require("<scripts>/actions/PlayerActions")
var GameStore = require("<scripts>/stores/GameStore")

var acceleration = 1
var deacceleration = 0.35
var maximum_velocity = 3

var PlayerStore = Reflux.createStore({
    data: {
        0: {
            id: 0,
            position: {
                x: 0,
                y: 0
            },
            velocity: {
                x: 0,
                y: 0
            }
        }
    },
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
        var my_id = GameStore.getData().my_id
        this.data[my_id].velocity.y -= acceleration * tick
        if(this.data[my_id].velocity.y < -maximum_velocity) {
            this.data[my_id].velocity.y = -maximum_velocity
        }
    },
    onPlayerPushSouth: function(tick) {
        var my_id = GameStore.getData().my_id
        this.data[my_id].velocity.y += acceleration * tick
        if(this.data[my_id].velocity.y > +maximum_velocity) {
            this.data[my_id].velocity.y = +maximum_velocity
        }
    },
    onPlayerPushWest: function(tick) {
        var my_id = GameStore.getData().my_id
        this.data[my_id].velocity.x -= acceleration * tick
        if(this.data[my_id].velocity.x < -maximum_velocity) {
            this.data[my_id].velocity.x = -maximum_velocity
        }
    },
    onPlayerPushEast: function(tick) {
        var my_id = GameStore.getData().my_id
        this.data[my_id].velocity.x += acceleration * tick
        if(this.data[my_id].velocity.x > +maximum_velocity) {
            this.data[my_id].velocity.x = +maximum_velocity
        }
    },
    onPlayerMove: function(key, dx, dy) {
        this.data[key].position.x += dx
        this.data[key].position.y += dy
    },
    onTick: function(tick) {
        var my_id = GameStore.getData().my_id

        var datum = this.data[my_id]
        var dx = datum.velocity.x * tick
        var dy = datum.velocity.y * tick
        PlayerActions.PlayerMove(my_id, dx, dy)

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
