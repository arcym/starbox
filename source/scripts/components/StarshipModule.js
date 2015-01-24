var StarshipModule = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}
                 className={this.renderClasses()}/>
        )
    },
    renderStyles: function() {
        return {
            left: this.props.data.position.x + "em",
            top: this.props.data.position.y + "em"
        }
    },
    renderClasses: function() {
        return React.addons.classSet({
            module: true,
            hull: this.props.data.category == "hull",
            engine: this.props.data.category == "engine",
            turret: this.props.data.category == "turret",
            ancient: this.props.data.affiliation == "ancient",
            rebellion: this.props.data.affiliation == "rebellion",
            federation: this.props.data.affiliation == "federation"
        })
    }
})

module.exports = StarshipModule
