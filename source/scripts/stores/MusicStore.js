var MusicStore = Reflux.createStore({
    data: [
        "./assets/music/three.mp3",
        "./assets/music/one.mp3",
        "./assets/music/two.mp3",
    ],
    getData: function() {
        return this.data
    },
    init: function() {
        this.playMusic()
    },
    playMusic: function() {
        var datum = this.data.shift()
        this.data.push(datum)
        
        var audio = new Audio(datum)
        audio.addEventListener("ended", function()
        {
            MusicStore.playMusic()
        })
        //audio.play()
    }
})

module.exports = MusicStore
