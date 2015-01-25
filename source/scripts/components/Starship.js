var StarshipStore = require("<scripts>/stores/StarshipStore")
var StarshipModule = require("<scripts>/components/StarshipModule")

var Starship = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}
                 className={this.renderClasses()}>
                 {this.renderModules()}
            </div>
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
                transform: "rotate(" + this.props.data.rotation + "deg)"
            }
        } else {
            return {
                left: this.props.data.position.x - player.position.x + (MAX_WIDTH / 2) - 0.5 + "em",
                top: this.props.data.position.y - player.position.y + (MAX_HEIGHT / 2) - 0.5 + "em",
                transform: "rotate(" + this.props.data.rotation + "deg)"
            }
        }
    },
    renderClasses: function() {
        return React.addons.classSet({
            starship: true,
            ancient: this.props.data.affiliation == "ancient",
            rebellion: this.props.data.affiliation == "rebellion",
            federation: this.props.data.affiliation == "federation",
            locust: this.props.data.affiliation == "locust"
        })
    },
    renderModules: function() {
        var renderings = []
        for(var index = 0; index < this.props.data.modules.length; index++) {
            var data = this.props.data.modules[index]
            renderings.push(<StarshipModule key={index} data={data}/>) 
        }
        return renderings
    }
})

module.exports = Starship
