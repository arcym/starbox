var StarColors = require("<scripts>/references/StarColors")
var StarshipActions = require("<scripts>/actions/StarshipActions")
var PlayerStarshipStore = require("<scripts>/stores/PlayerStarshipStore")

var AMOUNT_OF_STARS = 75

var StarStore = Reflux.createStore({
    data: [
    ],
    getData: function() {
        return this.data
    },
    init: function() {
        for(var index = 0; index < AMOUNT_OF_STARS; index++) {
            this.data.push({
                position: {
                    x: Math.random() * MAX_WIDTH,
                    y: Math.random() * MAX_HEIGHT,
                    z: Math.random() * (0.8 - 0.25) + 0.25
                },
                color: StarColors.getRandomColor()
            })
        }
    },
    listenables: [
        StarshipActions
    ],
    onStarshipMove: function(key, dx, dy) {
        if(key == PlayerStarshipStore.getKey()) {
            for(var index = 0; index < this.data.length; index++) {
                var datum = this.data[index]
                datum.position.x -= dx * datum.position.z
                datum.position.y -= dy * datum.position.z
                if(datum.position.x < MIN_WIDTH - 0.5) {
                    datum.position.x += MAX_WIDTH + 0.5
                    datum.position.y = Math.random() * MAX_HEIGHT
                } else if(datum.position.x > MAX_WIDTH + 0.5) {
                    datum.position.x -= MAX_WIDTH + 0.5
                    datum.position.y = Math.random() * MAX_HEIGHT
                } if(datum.position.y < MIN_HEIGHT - 0.5) {
                    datum.position.y += MAX_HEIGHT + 0.5
                    datum.position.x = Math.random() * MAX_WIDTH
                } else if(datum.position.y > MAX_HEIGHT + 0.5) {
                    datum.position.y -= MAX_HEIGHT + 0.5
                    datum.position.x = Math.random() * MAX_WIDTH
                }
            }
        }
        this.retrigger()
    }
})

module.exports = StarStore
