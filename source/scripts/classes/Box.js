var Box = function(protobox) {
    this.name = "[name]"
    this.description = "[description]"
    for(var key in protobox) {
        this[key] = protobox[key]
    }
}

module.exports = Box
