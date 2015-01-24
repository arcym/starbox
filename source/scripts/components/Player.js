var PlayerStore = require("<scripts>/stores/PlayerStore")

var Player = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}
                 className={this.renderClasses()}/>
        )
    },
    renderStyles: function() {
        /*return {
            left: this.props.data.position.x - 0.5 + "em",
            top: this.props.data.position.y - 0.5 + "em"
        }*/
    },
    renderClasses: function() {
        return React.addons.classSet({
            player: true,
            me: true
        })
    }
})

module.exports = Player
