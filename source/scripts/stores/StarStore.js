var StarshipActions = require("<scripts>/actions/StarshipActions")
var GameStore = require("<scripts>/stores/GameStore")
var StarColors = require("<scripts>/references/StarColors")

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
        if(key == GameStore.getData().my_id)
        for(var index = 0; index < this.data.length; index++) {
            this.data[index].position.x -= dx * this.data[index].position.z
            this.data[index].position.y -= dy * this.data[index].position.z
            if(this.data[index].position.x < MIN_WIDTH - 0.5) {
                this.data[index].position.x = MAX_WIDTH + 0.5
                this.data[index].position.y = Math.random() * MAX_HEIGHT
            } else if(this.data[index].position.x > MAX_WIDTH + 0.5) {
                this.data[index].position.x = MIN_WIDTH - 0.5
                this.data[index].position.y = Math.random() * MAX_HEIGHT
            } if(this.data[index].position.y < MIN_HEIGHT - 0.5) {
                this.data[index].position.y = MAX_HEIGHT + 0.5
                this.data[index].position.x = Math.random() * MAX_WIDTH
            } else if(this.data[index].position.y > MAX_HEIGHT + 0.5) {
                this.data[index].position.y = MIN_HEIGHT - 0.5
                this.data[index].position.x = Math.random() * MAX_WIDTH
            }
        }
        this.retrigger()
    }
})

module.exports = StarStore
