var StarshipModuleStore = Reflux.createStore({
    data: {
    },
    getData: function() {
        return this.data
    },
    addModule: function(key, module) {
        this.data[key] = module
        this.retrigger()
    }
})

module.exports = StarshipModuleStore
