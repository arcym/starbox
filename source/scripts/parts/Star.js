var Star = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}/>
        )
    },
    renderStyles: function() {
        var x = this.props.data.position.x
        var y = this.props.data.position.y
        var size = this.props.data.position.z * 0.1
        var color = this.props.data.color
        return {
            position: "absolute",
            top: y + "em",
            left: x + "em",
            width: size + "em",
            height: size + "em",
            backgroundColor: color
        }
    }
})

module.exports = Star
