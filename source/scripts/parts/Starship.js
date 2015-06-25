var Box = require("<scripts>/parts/Box")

var Starship = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}>
                {this.renderBoxes()}
            </div>
        )
    },
    renderStyles: function() {
        return {
            position: "absolute",
            top: this.props.data.position.y - (1 / 2) + "em",
            left: this.props.data.position.x - (1 / 2) + "em",
        }
    },
    renderBoxes: function() {
        var renderings = []
        for(var key in this.props.data.boxes) {
            var data = this.props.data.boxes[key]
            renderings.push(
                <Box key={key} data={data}/>
            )
        }
        return renderings
    }
})

module.exports = Starship
