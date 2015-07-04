window.React = require("react")
window.Phlux = require("phlux")

window.Keyb = require("keyb")
window.Tickly = require("tickly")

window.WIDTH = 20
window.HEIGHT = 15

var Star = require("<scripts>/views/Star")
var Starship = require("<scripts>/views/Starship")
var Projectile = require("<scripts>/views/Projectile")
var StarStore = require("<scripts>/stores/StarStore")
var StarshipStore = require("<scripts>/stores/StarshipStore")
var ProjectileStore = require("<scripts>/stores/ProjectileStore")
var GameFrame = require("<scripts>/views/GameFrame")

var Game = React.createClass({
    mixins: [
        Phlux.connectStore(StarStore, "stars"),
        Phlux.connectStore(StarshipStore, "starships"),
        Phlux.connectStore(ProjectileStore, "projectiles"),
    ],
    render: function() {
        return (
            <GameFrame aspect-ratio="20x15">
                {this.renderEntities(Star, this.state.stars)}
                {this.renderEntities(Projectile, this.state.projectiles)}
                {this.renderEntities(Starship, this.state.starships)}
                <span>WASD to move, space to shoot.</span>
            </GameFrame>
        )
    },
    renderEntities: function(Class, data) {
        var renderings = []
        for(var index in data) {
            renderings.push(
                <Class key={index}
                    data={data[index]}/>
            )
        }
        return (
            <div>
                {renderings}
            </div>
        )
    },
    componentDidMount: function() {
        Tickly.loop(function(tick) {
            StarshipStore.update(tick)
            ProjectileStore.update(tick)
            StarStore.update(tick)
        })
    }
})

React.render(<Game/>, document.body)
