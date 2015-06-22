window.React = require("react")
window.Phlux = require("phlux")

window.Keyb = require("keyb")
window.Tickly = require("tickly")

window.WIDTH = 20
window.HEIGHT = 15

var GameFrame = require("<scripts>/parts/GameFrame")

var Box = require("<scripts>/parts/Box")
var Star = require("<scripts>/parts/Star")
var Starship = require("<scripts>/parts/Starship")
var BoxStore = require("<scripts>/stores/BoxStore")
var StarStore = require("<scripts>/stores/StarStore")
var StarshipStore = require("<scripts>/stores/StarshipStore")

var Starbox = React.createClass({
    mixins: [
        Phlux.connectStore(BoxStore, "boxes"),
        Phlux.connectStore(StarStore, "stars"),
        Phlux.connectStore(StarshipStore, "starships")
    ],
    render: function() {
        return (
            <GameFrame aspect-ratio="20x15">
                {this.renderEntities(Star, this.state["stars"])}
                {this.renderEntities(Box, this.state["boxes"])}
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
        return renderings
    },
    componentDidMount: function() {
        Tickly.loop(function(tick) {
            StarshipStore.update(tick)
            StarStore.update(tick)
        })
    }
})

React.render(<Starbox/>, document.body)
