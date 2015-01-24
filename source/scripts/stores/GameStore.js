var GameStore = Reflux.createStore({
	data: {
	},
    getData: function() {
        return this.data
    },
    setData: function(data) {
    	this.data = data
    }
})

module.exports = GameStore
