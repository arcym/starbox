var UserStore = require("<scripts>/stores/UserStore")

var Box = function(protobox) {
    this.description = "[insert description]"
    for(var key in protobox) {
        this[key] = protobox[key]
    }
}

Box.prototype.onMouseOver = function() {
    UserStore.onMouseOverBox(this)
}

Box.prototype.onMouseOut = function() {
    UserStore.onMouseOutBox(this)
}

module.exports = Box
