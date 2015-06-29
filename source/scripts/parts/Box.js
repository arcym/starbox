var Box = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}>
                {this.renderChildren()}
            </div>
        )
    },
    renderStyles: function() {
        return {
            position: "absolute",
            top: this.props.data.position.y + "em",
            left: this.props.data.position.x + "em",
        }
    },
    renderChildren: function() {
        var renderings = []
        for(var index in this.props.data.shape) {
            renderings.push(
                <Boxdim key={index} data={this.props.data.shape[index]}/>
            )
        }
        return renderings
    }
})

var Boxdim = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}/>
        )
    },
    renderStyles: function() {
        return {
            width: 1 + "em",
            height: 1 + "em",
            position: "absolute",
            top: this.props.data.y + "em",
            left: this.props.data.x + "em",
            backgroundColor: "red",
            border: "1px solid black"
        }
    }
})

module.exports = Box
