var PlayerActions = require("<scripts>/actions/PlayerActions")

var PlayerStore = Reflux.createStore({
    data: [
        {
            position: {
                x: 3,
                y: 3
            }
        }
    ],
    getData: function() {
        return this.data
    },
    listenables: [
        PlayerActions
    ],
    onPlayerMoveNorth: function(tick)
    {
        this.data[0].position.y -= 1 * tick
        this.retrigger()
    },
    onPlayerMoveSouth: function(tick)
    {
        this.data[0].position.y += 1 * tick
        this.retrigger()
    },
    onPlayerMoveWest: function(tick)
    {
        this.data[0].position.x -= 1 * tick
        this.retrigger()
    },
    onPlayerMoveEast: function(tick)
    {
        this.data[0].position.x += 1 * tick
        this.retrigger()
    }
})

module.exports = PlayerStore
