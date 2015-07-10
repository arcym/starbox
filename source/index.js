window.React = require("react")
window.Phlux = require("phlux")

window.Keyb = require("keyb")
window.Tickly = require("tickly")

window.WIDTH = 20
window.HEIGHT = 15

var Star = require("<scripts>/views/Star")
var StarStore = require("<scripts>/stores/StarStore")
var Starship = require("<scripts>/views/Starship")
var StarshipStore = require("<scripts>/stores/StarshipStore")
var StarshipPart = require("<scripts>/views/StarshipPart")
var StarshipPartStore = require("<scripts>/stores/StarshipPartStore")
var Projectile = require("<scripts>/views/Projectile")
var ProjectileStore = require("<scripts>/stores/ProjectileStore")
var Message = require("<scripts>/views/Message")
var MessageStore = require("<scripts>/stores/MessageStore")
var GameFrame = require("<scripts>/views/GameFrame")
var Camera = require("<scripts>/views/Camera")

var Game = React.createClass({
    mixins: [
        Phlux.connectStore(StarStore, "stars"),
        Phlux.connectStore(StarshipStore, "starships"),
        Phlux.connectStore(ProjectileStore, "projectiles"),
        Phlux.connectStore(StarshipPartStore, "starshipparts"),
        Phlux.connectStore(MessageStore, "messages"),
    ],
    render: function() {
        return (
            <GameFrame aspect-ratio="20x15">
                {this.renderEntities(Star, this.state.stars)}
                <Camera target={this.state.starships[0]}>
                    {this.renderEntities(Projectile, this.state.projectiles)}
                    {this.renderEntities(Starship, this.state.starships)}
                    {this.renderEntities(StarshipPart, this.state.starshipparts)}
                </Camera>
                {this.renderEntities(Message, this.state.messages)}
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
        MessageStore.addMessage({
            "key": "instructions",
            "text": "Use WASD to move and SPACE to shoot. :]",
            "scale": 0.5,
            "timeout": 5,
            "position": {
                "x": 0.5,
                "y": 0.1
            }
        })
        Tickly.loop(function(tick) {
            StarshipStore.update(tick)
            ProjectileStore.update(tick)
            MessageStore.update(tick)
            StarStore.update(tick)
        })
    }
})

React.render(<Game/>, document.body)
