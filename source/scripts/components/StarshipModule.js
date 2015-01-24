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
            module: true
        })
    }
})

module.exports = StarshipModule
