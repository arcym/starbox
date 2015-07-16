var Camera = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}>
                {this.props.children}
            </div>
        )
    },
    lastx: 0,
    renderStyles: function() {
        if(!!this.props.target) {
            var x = this.props.target.position.sx
            this.lastx = x
            return {
                position: "absolute",
                left: x * -1 + "em"
            }
        } else {
            return {
                position: "absolute",
                left: this.lastx * -1 + "em"
            }
        }
    }
})

module.exports = Camera
