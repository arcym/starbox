var PlayerActions = require("<scripts>/actions/PlayerActions")

var StarStore = Reflux.createStore({
    data: [
    ],
    getData: function() {
        return this.data
    },
    init: function() {
        for(var index = 0; index < 75; index++) {
            this.data.push({
                position: {
                    x: Math.random() * MAX_WIDTH,
                    y: Math.random() * MAX_HEIGHT,
                    z: Math.random() * (1 - 0.15) + 0.15
                }
            })
        }
    },
    listenables: [
        PlayerActions
    ],
    onPlayerMoveNorth: function(tick) {
        for(var index = 0; index < this.data.length; index++) {
            var datum = this.data[index]
            datum.position.y += datum.position.z * tick
            if(datum.position.y > MAX_HEIGHT + 0.5) {
                datum.position.y = MIN_HEIGHT - 0.5
                datum.position.x = Math.random() * MAX_WIDTH
            }
        }
        this.retrigger()
    },
    onPlayerMoveSouth: function(tick) {
        for(var index = 0; index < this.data.length; index++) {
            var datum = this.data[index]
            datum.position.y -= datum.position.z * tick
            if(datum.position.y < MIN_HEIGHT - 0.5) {
                datum.position.y = MAX_HEIGHT + 0.5
                datum.position.x = Math.random() * MAX_WIDTH
            }
        }
        this.retrigger()
    },
    onPlayerMoveWest: function(tick) {
        for(var index = 0; index < this.data.length; index++) {
            var datum = this.data[index]
            datum.position.x += datum.position.z * tick
            if(datum.position.x > MAX_WIDTH + 0.5) {
                datum.position.x = MIN_WIDTH - 0.5
                datum.position.y = Math.random() * MAX_HEIGHT
            }
        }
        this.retrigger()
    },
    onPlayerMoveEast: function(tick) {
        for(var index = 0; index < this.data.length; index++) {
            var datum = this.data[index]
            datum.position.x -= datum.position.z * tick
            if(datum.position.x < MIN_WIDTH - 0.5) {
                datum.position.x = MAX_WIDTH + 0.5
                datum.position.y = Math.random() * MAX_HEIGHT
            }
        }
        this.retrigger()
    }
})

module.exports = StarStore
