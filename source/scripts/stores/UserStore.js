var UserStore = Phlux.createStore({
    data: {
        box: null
    },
    onMouseOverBox: function(box) {
        this.data.box = box
        this.trigger()
    },
    onMouseOutBox: function(box) {
        delete this.data.box
        this.trigger()
    }
})

module.exports = UserStore
