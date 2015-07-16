var StarStore = Phlux.createStore({
    colors: [
        "#E42217", //Lava Red, RGB(228, 34, 23)
        "#E5E4E2", //Platinum, RGB(229, 228, 226)
        "#4863A0", //Steel Blue, RGB(72, 99, 160)
        "#98AFC7", //Blue Gray, RGB(152, 175, 199)
        "#728C00", //Venom Green, RGB(114, 140, 0)
        "#F87217", //Pumpkin Orange, RGB(248, 114, 23)
        "#6C2DC7", //Purple Amethyst, RGB(108, 45, 199)
        "#3EA99F", //Light Sea Green, RGB(62, 169, 159)
        "#FFD801", //Rubber Ducky Yellow, RGB(255, 216, 1)
    ],
    getRandomColor: function() {
        return this.colors[Math.floor(Math.random() * this.colors.length)]
    },
    getRandomPosition: function(position) {
        position = position || new Object()
        position.x = position.x || Math.random() * WIDTH
        position.y = position.y || Math.random() * HEIGHT
        position.z = position.z || Math.random() * 0.75 + 0.25
        return position
    },
    initiateStore: function() {
        this.data = new Array()
        for(var i = 0; i < 75; i++) {
            this.data.push({
                color: this.getRandomColor(),
                position: this.getRandomPosition({
                    z: i % 12 / 16 + 0.25
                })
            })
        }
    },
    update: function(tick) {
        for(var index in this.data) {
            var datum = this.data[index]
            datum.position.x -= (tick * 2) * datum.position.z
            if(datum.position.x < 0) {
                datum.position = this.getRandomPosition({
                    x: datum.position.x + WIDTH + 1
                })
            }
        }
        this.trigger()
    }
})

module.exports = StarStore
