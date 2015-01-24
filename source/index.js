window.React = require("react/addons")
window.Reflux = require("reflux")
window.Firebase = require("firebase")
window.UUID = require("node-uuid")

window.Reflux.StoreMethods.getInitialState = function() {return this.getData()}
window.Reflux.StoreMethods.retrigger = function() {this.trigger(this.getData())}

window.MIN_WIDTH = 0
window.MIN_HEIGHT = 0
window.MAX_WIDTH = 16
window.MAX_HEIGHT = 9

var Game = require("<scripts>/Game")
React.render(<Game/>, document.body)
