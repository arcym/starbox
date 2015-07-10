var Camera = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}>
                {this.props.children}
            </div>
        )
    },
    renderStyles: function() {
        var x = this.props.target.position.sx
        return {
            position: "absolute",
            left: x * -1 + "em"
        }
    }
})

module.exports = Camera
