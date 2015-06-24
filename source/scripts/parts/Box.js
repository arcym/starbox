var Box = React.createClass({
    getInitialState: function() {
        return {
            hovered: false
        }
    },
    render: function() {
        return (
            <div style={this.renderStyles()}
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}/>
        )
    },
    renderStyles: function() {
        return {
            position: "absolute",
            width: this.props.data.width + "em",
            height: this.props.data.height + "em",
            top: this.props.data.position.y - (this.props.data.height / 2) + "em",
            left: this.props.data.position.x - (this.props.data.width / 2) + "em",
            border: this.state.hovered ? "0.075em solid white" : undefined,
            backgroundColor: this.props.data.color
        }
    },
    onMouseOver: function() {
        this.props.data.onMouseOver()
        this.setState({
            hovered: true
        })
    },
    onMouseOut: function() {
        this.props.data.onMouseOut()
        this.setState({
            hovered: false
        })
    }
})

module.exports = Box
