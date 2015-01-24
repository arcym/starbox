var GameStore = Reflux.createStore({
	data: {
		my_id: 0
	},
    getData: function() {
        return this.data
    },
    setData: function(data) {
    	this.data = data
    }
})

module.exports = GameStore
