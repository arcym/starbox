var PlayerStore = require("<scripts>/stores/PlayerStore")

var StarStore = Reflux.createStore({
    data: [
    ],
    getData: function() {
        return this.data
    },
    init: function() {
        for(var index = 0; index < 40; index++) {
            this.data.push({
                position: {
                    x: Math.random() * 16,
                    y: Math.random() * 9,
                    z: Math.random()
                }
            })
        }
    }
})

module.exports = StarStore
