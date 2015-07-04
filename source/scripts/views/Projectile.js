var Projectile = React.createClass({
	render: function() {
		return (
			<div style={this.renderStyles()}/>
		)
	},
	renderStyles: function() {
		var width = this.props.data.dimensions.x
		var height = this.props.data.dimensions.y * (this.props.data.age < 0.15 ? 2 : 1)
		var y = this.props.data.position.y - (height / 2)
		var x = this.props.data.position.x - (width / 2)
		return {
			position: "absolute",
			borderRadius: "0.25em",
			backgroundColor: "#CCC",
			width: width + "em",
			height: height + "em",
			top: y + "em",
			left: x + "em",
		}
	}
})

module.exports = Projectile
