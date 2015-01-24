window.React = require("react/addons")
window.Reflux = require("reflux")

Reflux.StoreMethods.getInitialState = function() {return this.getData()}
Reflux.StoreMethods.retrigger = function() {this.trigger(this.getData())}

window.MIN_WIDTH = 0
window.MIN_HEIGHT = 0
window.MAX_WIDTH = 16
window.MAX_HEIGHT = 9

var Game = require("<scripts>/Game")
React.render(<Game/>, document.body)
