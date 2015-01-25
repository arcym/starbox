var Star = require("<scripts>/components/Star")
var StarStore = require("<scripts>/stores/StarStore")

var Starship = require("<scripts>/components/Starship")
var StarshipStore = require("<scripts>/stores/StarshipStore")
var StarshipActions = require("<scripts>/actions/StarshipActions")
var StarshipBlip = require("<scripts>/components/StarshipBlip")

var LoopStore = require("<scripts>/stores/LoopStore")
var MusicStore = require("<scripts>/stores/MusicStore")
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
        InputActionStore.addAction("up arrow", StarshipActions.StarshipAccelerate)
        InputActionStore.addAction("down arrow", StarshipActions.StarshipDeaccelerate)
        InputActionStore.addAction("left arrow", StarshipActions.StarshipRotateLeft)
        InputActionStore.addAction("right arrow", StarshipActions.StarshipRotateRight)
    },
    render: function() {
        return (
            <GameFrame>
                {this.renderStore(this.state["stars"], Star)}
                {this.renderStore(this.state["starships"], Starship)}
                <div className="starmap">
                    <div className="radar"/>
                    <div className="circle"/>
                    <div className="circle"/>
                    {this.renderStore(this.state["starships"], StarshipBlip)}
                </div>
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
