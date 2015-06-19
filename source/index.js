window.React = require("react")
window.Phlux = require("phlux")

window.Keyb = require("keyb")
window.Tickly = require("tickly")

window.WIDTH = 20
window.HEIGHT = 15

var GameFrame = require("<scripts>/parts/GameFrame")

var Star = require("<scripts>/parts/Star")
var StarStore = require("<scripts>/stores/StarStore")

var Starbox = React.createClass({
    mixins: [
        Phlux.connectStore(StarStore, "stars")
    ],
    render: function() {
        return (
            <GameFrame aspect-ratio="20x15">
                {this.renderEntities(Star, this.state["stars"])}
            </GameFrame>
        )
    },
    componentDidMount: function() {
        Tickly.loop(function(tick) {
            StarStore.update(tick)
        })
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
    }
})

React.render(<Starbox/>, document.body)
