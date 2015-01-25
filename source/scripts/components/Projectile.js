var StarshipStore = require("<scripts>/stores/StarshipStore")

var Projectile = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}
                 className={this.renderClasses()}/>
        )
    },
    renderStyles: function() {
        var player = StarshipStore.getPlayerData()
        return {
            left: this.props.data.position.x - player.position.x + (MAX_WIDTH / 2) + "em",
            top: this.props.data.position.y - player.position.y + (MAX_HEIGHT / 2) + "em",
                transform: "rotate(" + this.props.data.rotation + "deg)"
        }
    },
    renderClasses: function() {
        return React.addons.classSet({
            "projectile": true
        })
    }
})

module.exports = Projectile
