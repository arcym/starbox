var Player = require("<scripts>/components/Player")
var GameFrame = require("<scripts>/components/GameFrame")

var LoopStore = require("<scripts>/stores/LoopStore")
var PlayerStore = require("<scripts>/stores/PlayerStore")
var InputActionStore = require("<scripts>/stores/InputActionStore")
var KeyboardInputStore = require("<scripts>/stores/KeyboardInputStore")

var LoopActions = require("<scripts>/actions/LoopActions")
var KeyboardInputActions = require("<scripts>/actions/KeyboardInputActions")
var PlayerActions = require("<scripts>/actions/PlayerActions")

var Game = React.createClass({
	mixins: [
		Reflux.connect(PlayerStore, "players")
	],
	componentDidMount: function() {
		InputActionStore.addAction("w", PlayerActions.PlayerMoveNorth)
		InputActionStore.addAction("s", PlayerActions.PlayerMoveSouth)
		InputActionStore.addAction("a", PlayerActions.PlayerMoveWest)
		InputActionStore.addAction("d", PlayerActions.PlayerMoveEast)
	},
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
