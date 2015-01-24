var PlayerStore = require("<scripts>/stores/PlayerStore")

var Player = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}
                 className={this.renderClasses()}/>
        )
    },
    renderStyles: function() {
        var my_data = PlayerStore.getMyData()
        if(this.props.data.id == my_data.id) {
            return {
                top: "0px",
                left: "0px",
                right: "0px",
                bottom: "0px",
                margin: "auto"
            }
        } else {
            return {
                left: -my_data.position.x - this.props.data.position.x - (MAX_WIDTH / 2) - 0.5 + "em",
                top: -my_data.position.y - this.props.data.position.y - (MAX_HEIGHT / 2) - 0.5 + "em"
            }
        }
    },
    renderClasses: function() {
        return React.addons.classSet({
            player: true
        })
    }
})

module.exports = Player
