var Message = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}>
                {this.renderText()}
            </div>
        )
    },
    renderStyles: function() {
        return {
            top: this.props.data.position.y + "em",
            left: this.props.data.position.x + "em",
            position: "absolute"
        }
    },
    renderText: function() {
        return (
            <span style={{fontSize: this.props.data.scale + "em"}}>
                {this.props.data.text}
            </span>
        )
    }
})

module.exports = Message
