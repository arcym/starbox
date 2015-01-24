var LoopActions = require("<scripts>/actions/LoopActions")
var StarshipActions = require("<scripts>/actions/StarshipActions")
var GameStore = require("<scripts>/stores/GameStore")

var acceleration = 2
var deacceleration = 1
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
        },
        1: {
            id: 1,
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
        StarshipActions
    ],
    onStarshipPushNorth: function(tick) {
        var my_id = GameStore.getData().my_id
        this.data[my_id].velocity.y -= acceleration * tick
        if(this.data[my_id].velocity.y < -maximum_velocity) {
            this.data[my_id].velocity.y = -maximum_velocity
        }
    },
    onStarshipPushSouth: function(tick) {
        var my_id = GameStore.getData().my_id
        this.data[my_id].velocity.y += acceleration * tick
        if(this.data[my_id].velocity.y > +maximum_velocity) {
            this.data[my_id].velocity.y = +maximum_velocity
        }
    },
    onStarshipPushWest: function(tick) {
        var my_id = GameStore.getData().my_id
        this.data[my_id].velocity.x -= acceleration * tick
        if(this.data[my_id].velocity.x < -maximum_velocity) {
            this.data[my_id].velocity.x = -maximum_velocity
        }
    },
    onStarshipPushEast: function(tick) {
        var my_id = GameStore.getData().my_id
        this.data[my_id].velocity.x += acceleration * tick
        if(this.data[my_id].velocity.x > +maximum_velocity) {
            this.data[my_id].velocity.x = +maximum_velocity
        }
    },
    onStarshipMove: function(key, dx, dy) {
        this.data[key].position.x += dx
        this.data[key].position.y += dy
    },
    onTick: function(tick) {
        var my_id = GameStore.getData().my_id

        var datum = this.data[my_id]
        var dx = datum.velocity.x * tick
        var dy = datum.velocity.y * tick
        StarshipActions.StarshipMove(my_id, dx, dy)

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
