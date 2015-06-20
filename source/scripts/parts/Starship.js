var Starship = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}>
                {this.renderParts()}
            </div>
        )
    },
    renderStyles: function() {
        var size = 1
        var x = this.props.data.position.x - (size / 2)
        var y = this.props.data.position.y - (size / 2)
        return {
            top: y + "em",
            left: x + "em",
            width: size + "em",
            height: size + "em",
            position: "absolute",
            backgroundSize: "2em 2em",
            backgroundPosition: "1em 1em",
            backgroundImage: "url(./assets/images/cores.png)",
        }
    },
    renderParts: function() {
        var renderings = []
        for(var key in this.props.data.parts) {
            var data = this.props.data.parts[key]
            renderings.push(
                <StarshipPart key={key} data={data}/>
            )
        }
        return renderings
    }
})

var StarshipPart = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}/>
        )
    },
    renderStyles: function() {
        var type = this.props.data.type
        var x = this.props.data.position.x
        var y = this.props.data.position.y
        return {
            width: 1 + "em",
            height: 1 + "em",
            top: y + "em",
            left: x + "em",
            position: "absolute",
            backgroundSize: "2em 2em",
            backgroundPosition: "1em 1em",
            backgroundImage: "url(./assets/images/" + type + "s.png)",
        }
    }
})

module.exports = Starship
