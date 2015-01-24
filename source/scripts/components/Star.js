var Star = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}
                 className={this.renderClasses()}/>
        )
    },
    renderStyles: function() {
        return {
            left: this.props.data.position.x + "em",
            top: this.props.data.position.y + "em",
            width: this.props.data.position.z * 0.2 + "em",
            height: this.props.data.position.z * 0.2 + "em"
        }
    },
    renderClasses: function() {
        return "star"
    }
})

module.exports = Star
