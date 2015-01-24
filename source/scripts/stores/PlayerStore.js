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
    }
})

module.exports = PlayerStore
