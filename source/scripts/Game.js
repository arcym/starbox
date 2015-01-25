var Star = require("<scripts>/components/Star")
var StarStore = require("<scripts>/stores/StarStore")

var Starship = require("<scripts>/components/Starship")
var StarshipStore = require("<scripts>/stores/StarshipStore")
var StarshipActions = require("<scripts>/actions/StarshipActions")
var StarshipBlip = require("<scripts>/components/StarshipBlip")

var StarshipModule = require("<scripts>/components/StarshipModule")
var StarshipModuleStore = require("<scripts>/stores/StarshipModuleStore")

var Projectile = require("<scripts>/components/Projectile")
var ProjectileStore = require("<scripts>/stores/ProjectileStore")

var LoopStore = require("<scripts>/stores/LoopStore")
var MusicStore = require("<scripts>/stores/MusicStore")
var InputActionStore = require("<scripts>/stores/InputActionStore")
var KeyboardInputStore = require("<scripts>/stores/KeyboardInputStore")
var GameFrame = require("<scripts>/components/GameFrame")

var Game = React.createClass({
    mixins: [
        Reflux.connect(StarshipStore, "starships"),
        Reflux.connect(StarStore, "stars"),
        Reflux.connect(ProjectileStore, "projectiles"),
        Reflux.connect(StarshipModuleStore, "modules")
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
                {this.renderStore(this.state["projectiles"], Projectile)}
                {this.renderStore(this.state["starships"], Starship)}
                <div className="starmap">
                    <div className="starmap-radar"/>
                    <div className="starmap-circle"/>
                    {this.renderStore(this.state["starships"], StarshipBlip)}
                </div>
                <div className="instructions">
                    Use W to accelerate, and A/D to rotate. Use SPACE to shoot!
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
