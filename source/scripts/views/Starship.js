var StarshipPart = require("<scripts>/views/StarshipPart")

var Starship = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}>
                {this.renderParts()}
            </div>
        )
    },
    renderStyles: function() {
        var x = this.props.data.position.x
        var y = this.props.data.position.y
        if(this.props.data.position.sx) {
            x += this.props.data.position.sx
        }
        if(this.props.data.position.sy) {
            y += this.props.data.position.sy
        }
        return {
            position: "absolute",
            top: y - (1 / 2) + "em",
            left: x - (1 / 2) + "em",
        }
    },
    renderParts: function() {
        var renderings = new Array()
        for(var key in this.props.data.parts) {
            var data = this.props.data.parts[key]
            renderings.push(
                <StarshipPart key={key} data={data}/>
            )
        }
        return renderings
    }
})

module.exports = Starship
