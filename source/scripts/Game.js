var Player = require("<scripts>/components/Player")
var GameFrame = require("<scripts>/components/GameFrame")

var LoopStore = require("<scripts>/stores/LoopStore")
var PlayerStore = require("<scripts>/stores/PlayerStore")
var KeyboardInputStore = require("<scripts>/stores/KeyboardInputStore")

var LoopActions = require("<scripts>/actions/LoopActions")
var KeyboardInputActions = require("<scripts>/actions/KeyboardInputActions")

var Game = React.createClass({
	mixins: [
		Reflux.connect(PlayerStore, "players")
	],
	render: function() {
		return (
			<GameFrame>
				{this.renderStore(this.state["players"], Player)}
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
