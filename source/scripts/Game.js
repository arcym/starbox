var Star = require("<scripts>/components/Star")
var Player = require("<scripts>/components/Player")
var GameFrame = require("<scripts>/components/GameFrame")

var PlayerStore = require("<scripts>/stores/PlayerStore")
var StarStore = require("<scripts>/stores/StarStore")

var PlayerActions = require("<scripts>/actions/PlayerActions")

var LoopStore = require("<scripts>/stores/LoopStore")
var InputActionStore = require("<scripts>/stores/InputActionStore")
var KeyboardInputStore = require("<scripts>/stores/KeyboardInputStore")

var Game = React.createClass({
	mixins: [
		Reflux.connect(PlayerStore, "players"),
		Reflux.connect(StarStore, "stars")
	],
	componentDidMount: function() {
		InputActionStore.addAction("w", PlayerActions.PlayerPushNorth)
		InputActionStore.addAction("s", PlayerActions.PlayerPushSouth)
		InputActionStore.addAction("a", PlayerActions.PlayerPushWest)
		InputActionStore.addAction("d", PlayerActions.PlayerPushEast)
	},
	render: function() {
		return (
			<GameFrame>
				{this.renderStore(this.state["stars"], Star)}
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
