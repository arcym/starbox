var Player = require("<scripts>/components/Player")
var GameFrame = require("<scripts>/components/GameFrame")

var Game = React.createClass({
	render: function() {
		return (
			<GameFrame>
				<Player/>
			</GameFrame>
		)
	}
})

module.exports = Game
