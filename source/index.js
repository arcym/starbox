window.React = require("react")
window.Phlux = require("phlux")

window.Keyb = require("keyb")
window.Tickly = require("tickly")

window.WIDTH = 20
window.HEIGHT = 15

var GameFrame = require("<scripts>/parts/GameFrame")

var Starbox = React.createClass({
    render: function() {
        return (
            <GameFrame aspect-ratio="20x15">
                Hello World!
            </GameFrame>
        )
    },
    componentDidMount: function() {
        Tickly.loop(function() {
            
        })
    }
})

React.render(<Starbox/>, document.body)
