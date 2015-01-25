var Star = require("<scripts>/components/Star")
var StarStore = require("<scripts>/stores/StarStore")

var Starship = require("<scripts>/components/Starship")
var StarshipStore = require("<scripts>/stores/StarshipStore")
var StarshipActions = require("<scripts>/actions/StarshipActions")

var LoopStore = require("<scripts>/stores/LoopStore")
var InputActionStore = require("<scripts>/stores/InputActionStore")
var KeyboardInputStore = require("<scripts>/stores/KeyboardInputStore")
var GameFrame = require("<scripts>/components/GameFrame")

var Game = React.createClass({
    mixins: [
        Reflux.connect(StarshipStore, "starships"),
        Reflux.connect(StarStore, "stars")
    ],
    componentDidMount: function() {
        InputActionStore.addAction("w", StarshipActions.StarshipAccelerate)
        InputActionStore.addAction("s", StarshipActions.StarshipDeaccelerate)
        InputActionStore.addAction("a", StarshipActions.StarshipRotateLeft)
        InputActionStore.addAction("d", StarshipActions.StarshipRotateRight)
        InputActionStore.addAction("space bar", StarshipActions.StarshipFireTurrets)

        new Audio("./assets/music/test.mp3").play()
        console.log("!")
    },
    render: function() {
        return (
            <GameFrame>
                {this.renderStore(this.state["stars"], Star)}
                {this.renderStore(this.state["starships"], Starship)}
            </GameFrame>
        )
    },
    renderStore: function(Store, Class) {
        var renderings = []
        for(var key in Store) {
            var data = Store[key]
            renderings.push(
                <Class data={data}
                       key={key}/>
            )
        }
        return renderings
    }
})

module.exports = Game
