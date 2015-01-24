var Star = require("<scripts>/components/Star")
var Starship = require("<scripts>/components/Starship")
var GameFrame = require("<scripts>/components/GameFrame")

var StarshipStore = require("<scripts>/stores/StarshipStore")
var StarStore = require("<scripts>/stores/StarStore")

var StarshipActions = require("<scripts>/actions/StarshipActions")

var LoopStore = require("<scripts>/stores/LoopStore")
var InputActionStore = require("<scripts>/stores/InputActionStore")
var KeyboardInputStore = require("<scripts>/stores/KeyboardInputStore")

var Game = React.createClass({
	mixins: [
		Reflux.connect(StarshipStore, "starships"),
		Reflux.connect(StarStore, "stars")
	],
	componentDidMount: function() {
		InputActionStore.addAction("w", StarshipActions.StarshipPushNorth)
		InputActionStore.addAction("s", StarshipActions.StarshipPushSouth)
		InputActionStore.addAction("a", StarshipActions.StarshipPushWest)
		InputActionStore.addAction("d", StarshipActions.StarshipPushEast)
	},
	render: function() {
		return (
			<GameFrame>
				{this.renderStore(this.state["stars"], Star)}
				{this.renderStore(this.state["starships"], Starship)}
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
