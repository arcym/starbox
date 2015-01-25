var StarshipStore = require("<scripts>/stores/StarshipStore")

var StarshipBlip = React.createClass({
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
                margin: "auto",
            }
        } else {
            return {
                left: this.props.data.position.x - player.position.x + (25 / 2) - 0.5 + "em",
                top: this.props.data.position.y - player.position.y + (25 / 2) - 0.5 + "em",
            }
        }
        return {
            left: this.props.data.position.x * 0.15 + "em",
            top: this.props.data.position.y * 0.15 + "em"
        }
    },
    renderClasses: function() {
        return React.addons.classSet({
            "starship-blip": true,
            "ancient": this.props.data.affiliation == "ancient",
            "rebellion": this.props.data.affiliation == "rebellion",
            "federation": this.props.data.affiliation == "federation",
            "locust": this.props.data.affiliation == "locust",
            "player": this.props.data.key == StarshipStore.getPlayerData().key
        })
    }
})

module.exports = StarshipBlip
