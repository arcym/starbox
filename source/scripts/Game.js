var Player = require("<scripts>/components/Player")
var GameFrame = require("<scripts>/components/GameFrame")

var PlayerStore = require("<scripts>/stores/PlayerStore")

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
