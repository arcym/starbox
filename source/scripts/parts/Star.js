var Star = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}/>
        )
    },
    renderStyles: function() {
        return {
            position: "absolute",
            top: this.props.data.position.y + "em",
            left: this.props.data.position.x + "em",
            width: this.props.data.position.z * 0.1 + "em",
            height: this.props.data.position.z * 0.1 + "em",
            backgroundColor: this.props.data.color
        }
    }
})

module.exports = Star
