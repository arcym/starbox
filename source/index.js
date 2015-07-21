window.React = require("react")
window.Phlux = require("phlux")
window.ShortID = require("shortid")
window.Keyb = require("keyb")
window.Tickly = require("tickly")

window.WIDTH = 20
window.HEIGHT = 15

var StarStore = require("<scripts>/stores/StarStore")
var StarshipStore = require("<scripts>/stores/StarshipStore")
var StarshipPartStore = require("<scripts>/stores/StarshipPartStore")
var ExplosionStore = require("<scripts>/stores/ExplosionStore")
var ProjectileStore = require("<scripts>/stores/ProjectileStore")
var MessageStore = require("<scripts>/stores/MessageStore")

var Star = require("<scripts>/views/Star")
var Starship = require("<scripts>/views/Starship")
var StarshipPart = require("<scripts>/views/StarshipPart")
var Explosion = require("<scripts>/views/Explosion")
var Projectile = require("<scripts>/views/Projectile")
var Message = require("<scripts>/views/Message")
var Camera = require("<scripts>/views/Camera")

var FrameView = require("<scripts>/views/FrameView")
var ForEachView = require("<scripts>/views/ForEachView")

var GameView = React.createClass({
    mixins: [
        Phlux.connectStore(StarStore, "stars"),
        Phlux.connectStore(StarshipStore, "starships"),
        Phlux.connectStore(ProjectileStore, "projectiles"),
        Phlux.connectStore(StarshipPartStore, "starshipparts"),
        Phlux.connectStore(ExplosionStore, "explosions"),
        Phlux.connectStore(MessageStore, "messages"),
    ],
    render: function() {
        return (
            <FrameView aspect-ratio={WIDTH + "x" + HEIGHT}>
                <ForEachView data={this.state.stars} view={Star}/>
                <Camera target={this.state.starships[0]}>
                    <ForEachView data={this.state.projectiles} view={Projectile}/>
                    <ForEachView data={this.state.starships} view={Starship}/>
                    <ForEachView data={this.state.starshipparts} view={StarshipPart}/>
                    <ForEachView data={this.state.explosions} view={Explosion}/>
                </Camera>
                <ForEachView data={this.state.messages} view={Message}/>
            </FrameView>
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
            ExplosionStore.update(tick)
            StarStore.update(tick)
        })
    }
})

React.render(<GameView/>, document.body)
