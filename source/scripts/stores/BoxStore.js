var BoxStore = Phlux.createStore({
    data: {
        1: {
            width: 1,
            height: 1,
            color: "green",
            position: {
                x: 3.5,
                y: 2.5
            }
        },
        2: {
            width: 1,
            height: 1,
            color: "red",
            position: {
                x: 5.5,
                y: 5.5
            }
        }
    }
})

module.exports = BoxStore
