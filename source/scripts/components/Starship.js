var StarshipStore = require("<scripts>/stores/StarshipStore")

var Starship = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}
                 className={this.renderClasses()}/>
        )
    },
    renderStyles: function() {
        var player = StarshipStore.getPlayerData()
        if(this.props.data.key == player.key) {
            return {
                top: "0px",
                left: "0px",
                right: "0px",
                bottom: "0px",
                margin: "auto"
            }
        } else {
            return {
                left: -player.position.x - this.props.data.position.x + (MAX_WIDTH / 2) - 0.5 + "em",
                top: -player.position.y - this.props.data.position.y + (MAX_HEIGHT / 2) - 0.5 + "em"
            }
        }
    },
    renderClasses: function() {
        return React.addons.classSet({
            starship: true
        })
    }
})

module.exports = Starship
