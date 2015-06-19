var Starship = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}/>
        )
    },
    renderStyles: function() {
        var size = 1
        var x = this.props.data.position.x - (size / 2)
        var y = this.props.data.position.y - (size / 2)
        return {
            top: y + "em",
            left: x + "em",
            width: size + "em",
            height: size + "em",
            position: "absolute",
            backgroundColor: "red"
        }
    }
})

module.exports = Starship
