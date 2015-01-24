var LoopActions = require("<scripts>/actions/LoopActions")
var PlayerActions = require("<scripts>/actions/PlayerActions")
var GameStore = require("<scripts>/stores/GameStore")

var acceleration = 1
var deacceleration = 0.35
var maximum_velocity = 3

var firebase = new Firebase("https://starbox.firebaseio.com/")

var me = {
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
}

var ref = firebase.push(me)
GameStore.setData({
    my_id: ref.key()
})

var PlayerStore = Reflux.createStore({
    data: {
    },
    getData: function() {
        return this.data
    },
    getMyData: function() {
        var my_id = GameStore.getData().my_id
        return this.data[my_id]
    },
    setData: function(key, value) {
        this.data[key] = value
        this.data[key].id = key
        this.retrigger()
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
        firebase.child(my_id).set(this.data[my_id])
    },
    onPlayerPushSouth: function(tick) {
        var my_id = GameStore.getData().my_id
        this.data[my_id].velocity.y += acceleration * tick
        if(this.data[my_id].velocity.y > +maximum_velocity) {
            this.data[my_id].velocity.y = +maximum_velocity
        }
        firebase.child(my_id).set(this.data[my_id])
    },
    onPlayerPushWest: function(tick) {
        var my_id = GameStore.getData().my_id
        this.data[my_id].velocity.x -= acceleration * tick
        if(this.data[my_id].velocity.x < -maximum_velocity) {
            this.data[my_id].velocity.x = -maximum_velocity
        }
        firebase.child(my_id).set(this.data[my_id])
    },
    onPlayerPushEast: function(tick) {
        var my_id = GameStore.getData().my_id
        this.data[my_id].velocity.x += acceleration * tick
        if(this.data[my_id].velocity.x > +maximum_velocity) {
            this.data[my_id].velocity.x = +maximum_velocity
        }
        firebase.child(my_id).set(this.data[my_id])
    },
    onPlayerMove: function(key, dx, dy) {
        this.data[key].position.x += dx
        this.data[key].position.y += dy
        firebase.child(key).set(this.data[my_id])
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
        firebase.child(my_id).set(this.data[my_id])
        this.retrigger()
    }
})

firebase.on("child_added", function(child) {
    PlayerStore.setData(child.key(), child.val())
})
firebase.on("child_changed", function(child) {
    PlayerStore.setData(child.key(), child.val())
})

module.exports = PlayerStore
