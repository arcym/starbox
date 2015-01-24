var PlayerActions = require("<scripts>/actions/PlayerActions")
var GameStore = require("<scripts>/stores/GameStore")

var colors = [
    "#E42217", //Lava Red, RGB(228, 34, 23)
    "#E5E4E2", //Platinum, RGB(229, 228, 226)
    "#4863A0", //Steel Blue, RGB(72, 99, 160)
    "#98AFC7", //Blue Gray, RGB(152, 175, 199)
    "#728C00", //Venom Green, RGB(114, 140, 0)
    "#F87217", //Pumpkin Orange, RGB(248, 114, 23)
    "#6C2DC7", //Purple Amethyst, RGB(108, 45, 199)
    "#3EA99F", //Light Sea Green, RGB(62, 169, 159)
    "#FFD801", //Rubber Ducky Yellow, RGB(255, 216, 1)
]

var StarStore = Reflux.createStore({
    data: [
    ],
    getData: function() {
        return this.data
    },
    init: function() {
        for(var index = 0; index < 75; index++) {
            this.data.push({
                position: {
                    x: Math.random() * MAX_WIDTH,
                    y: Math.random() * MAX_HEIGHT,
                    z: Math.random() * (0.8 - 0.25) + 0.25
                },
                color: colors[Math.floor(Math.random() * colors.length)]
            })
        }
    },
    listenables: [
        PlayerActions
    ],
    onPlayerMove: function(key, dx, dy) {
        if(key == GameStore.getData().my_id)
        for(var index = 0; index < this.data.length; index++) {
            this.data[index].position.x -= dx * this.data[index].position.z
            this.data[index].position.y -= dy * this.data[index].position.z
            if(this.data[index].position.x < MIN_WIDTH - 0.5) {
                this.data[index].position.x = MAX_WIDTH + 0.5
                this.data[index].position.y = Math.random() * MAX_HEIGHT
            } else if(this.data[index].position.x > MAX_WIDTH + 0.5) {
                this.data[index].position.x = MIN_WIDTH - 0.5
                this.data[index].position.y = Math.random() * MAX_HEIGHT
            } if(this.data[index].position.y < MIN_HEIGHT - 0.5) {
                this.data[index].position.y = MAX_HEIGHT + 0.5
                this.data[index].position.x = Math.random() * MAX_WIDTH
            } else if(this.data[index].position.y > MAX_HEIGHT + 0.5) {
                this.data[index].position.y = MIN_HEIGHT - 0.5
                this.data[index].position.x = Math.random() * MAX_WIDTH
            }
        }
        this.retrigger()
    }
})

module.exports = StarStore
