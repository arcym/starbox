var Box = function(protobox) {
    this.width = 1
    this.height = 1
    this.color = "#FFF"
    this.position = {
        x: 0.5,
        y: 0.5
    }
    
    for(var key in protobox) {
        this[key] = protobox[key]
    }
}

Box.prototype.onMouseOver = function() {
    console.log(this.description)
}

Box.prototype.onMouseOut = function() {
    //?!
}

var BoxStore = Phlux.createStore({
    data: {
        1: new Box({
            width: 1,
            height: 1,
            color: "green",
            description: "A failed prototype of the T5-beta.",
            position: {
                x: 3.5,
                y: 2.5
            }
        }),
        2: new Box({
            width: 1,
            height: 1,
            color: "red",
            description: "Some shrapnel from maybe a missile.",
            position: {
                x: 5.5,
                y: 5.5
            }
        })
    }
})

module.exports = BoxStore
