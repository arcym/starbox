var PlayerStore = Reflux.createStore({
    data: {
        position: {
            x: 1,
            y: 1
        }
    },
    getData: function() {
        return this.data
    }
})

module.exports = PlayerStore
