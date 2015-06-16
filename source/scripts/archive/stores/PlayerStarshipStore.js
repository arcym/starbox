var PlayerStarshipStore = Reflux.createStore({
    data: {
        key: 0
    },
    getData: function() {
        return this.data
    },
    getKey: function() {
        return this.data.key
    }
})

module.exports = PlayerStarshipStore
