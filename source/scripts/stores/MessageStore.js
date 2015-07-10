var MessageStore = Phlux.createStore({
    addMessage: function(message) {
        this.data[message.key] = message
        this.trigger()
    },
    update: function(tick) {
        for(var key in this.data) {
            var message = this.data[key]
            if(!!message.timeout) {
                message.timeout -= tick
                if(message.timeout <= 0) {
                    delete this.data[key]
                }
            }
        }
    }
})

module.exports = MessageStore
