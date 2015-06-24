var UserInterfaceStore = require("<scripts>/stores/UserInterfaceStore")

var Box = function(protobox) {
    this.width = 1
    this.height = 1
    this.color = "#FFF"
    this.position = {
        x: 0.5, y: 0.5
    }
    
    for(var key in protobox) {
        this[key] = protobox[key]
    }
}

Box.prototype.onMouseOver = function() {
    UserInterfaceStore.data.box = this
    UserInterfaceStore.trigger()
}

Box.prototype.onMouseOut = function() {
    UserInterfaceStore.data.box = null
    UserInterfaceStore.trigger()
}

var BoxStore = Phlux.createStore({
    data: {
        1: new Box({
            width: 1,
            height: 1,
            color: "green",
            name: "T5-623-beta",
            description: "A failed prototype of the T5-624.",
            position: {
                x: 3.5,
                y: 2.5
            }
        }),
        2: new Box({
            width: 1,
            height: 1,
            color: "red",
            name: "Shrapnel",
            description: "Some shrapnel from a kinetic missile.",
            position: {
                x: 5.5,
                y: 5.5
            }
        })
    }
})

module.exports = BoxStore
