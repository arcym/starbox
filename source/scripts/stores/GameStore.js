var GameStore = Reflux.createStore({
	data: {
		my_id: 0
	},
    getData: function() {
        return this.data
    }
})

module.exports = GameStore
