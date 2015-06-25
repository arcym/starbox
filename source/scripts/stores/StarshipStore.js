var Box = require("<scripts>/classes/Box")

var StarshipStore = Phlux.createStore({
    data: {
        me: {
            position: {
                x: 5,
                y: 3
            },
            boxes: [
                new Box({
                    name: "Part-1",
                    dimensions: {
                        width: 1,
                        height: 1,
                        color: "#FF9900"
                    },
                    position: {
                        x: 0,
                        y: 0
                    }
                }),
                new Box({
                    name: "Part-2",
                    dimensions: {
                        width: 2,
                        height: 2,
                        color: "#097054"
                    },
                    position: {
                        x: -2,
                        y: -1
                    }
                }),
                new Box({
                    name: "Part-3",
                    dimensions: {
                        width: 1,
                        height: 1,
                        color: "#FFDE00"
                    },
                    position: {
                        x: -3,
                        y: -1
                    }
                }),
                new Box({
                    name: "Part-4",
                    dimensions: {
                        width: 3,
                        height: 1,
                        color: "#6599FF"
                    },
                    position: {
                        x: -1,
                        y: +1
                    }
                })
            ]
        },
        alpha: {
            position: {
                x: 8,
                y: 9
            },
            boxes: [
                new Box({
                    name: "Part-1",
                    dimensions: {
                        width: 1,
                        height: 1,
                        color: "blue"
                    },
                    position: {
                        x: 0,
                        y: 0
                    }
                }),
                new Box({
                    name: "Part-2",
                    dimensions: [
                        {
                            x: 0,
                            y: -1,
                            width: 1,
                            height: 2,
                            color: "green"
                        },
                        {
                            x: +1,
                            y: 0,
                            width: 1,
                            height: 1,
                            color: "green"
                        },
                    ],
                    position: {
                        x: -1,
                        y: +1
                    }
                }),
                new Box({
                    name: "Part-3",
                    dimensions: [
                        {
                            x: 0,
                            y: 0,
                            width: 1,
                            height: 1,
                            color: "yellow"
                        },
                        {
                            x: -1,
                            y: -1,
                            width: 3,
                            height: 1,
                            color: "yellow"
                        },
                    ],
                    position: {
                        x: -2,
                        y: 0
                    }
                })
            ]
        }
    },
    update: function(tick) {
        for(var key in this.data) {
            if(this.data[key].update) {
                this.data[key].update(tick)
            }
        }
    }
})

module.exports = StarshipStore
