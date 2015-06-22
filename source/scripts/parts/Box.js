var Box = React.createClass({
    getInitialState: function() {
        return {
            selected: false
        }
    },
    render: function() {
        return (
            <div style={this.renderStyles()}
                onMouseDown={this.onMouseDown}
                onMouseMove={this.onMouseMove}
                onMouseUp={this.onMouseUp}/>
        )
    },
    renderStyles: function() {
        return {
            position: "absolute",
            width: this.props.data.width + "em",
            height: this.props.data.height + "em",
            top: this.props.data.position.y - (this.props.data.height / 2) + "em",
            left: this.props.data.position.x - (this.props.data.width / 2) + "em",
            backgroundColor: this.props.data.color,
            outline: this.state.selected ? "2px solid white" : null
        }
    },
    onMouseDown: function(event) {
        this.setState({
            selected: true
        })
    },
    onMouseUp: function(event) {
        this.setState({
            selected: false
        })
    },
    onMouseMove: function(event) {
        var point = this.rebase({
            x: event["clientX"],
            y: event["clientY"]
        })
        if(this.state.selected == true) {
            this.props.data.position = point
            this.forceUpdate()
        }
    },
    rebase: function(point) {
        var scale = GameFrame.getScale()
        var offset = GameFrame.getOffset()
        return {
            x: (point.x - offset.x) / scale,
            y: (point.y - offset.y) / scale
        }
    }
})

var GameFrame = {
    getScale: function() {
        var html = document.getElementById("game-frame")
        var css = window.getComputedStyle(html)
        return Number(css.fontSize.match(/(\d+(\.\d+)?)px$/)[1])
    },
    getOffset: function() {
        var dom = document.getElementById("game-frame")
        return {
            x: dom.offsetLeft,
            y: dom.offsetTop
        }
    }
}

module.exports = Box
