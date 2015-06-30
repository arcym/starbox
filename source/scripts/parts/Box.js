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
    getInitialState: function() {
        return {
            image: null
        }
    },
    render: function() {
        return (
            <div style={this.renderStyles()}
                onDrop={this.onDrop}
                onDragEnter={this.onDrag}
                onDragOver={this.onDrag}/>
        )
    },
    renderStyles: function() {
        return {
            width: 1 + "em",
            height: 1 + "em",
            position: "absolute",
            top: this.props.data.y + "em",
            left: this.props.data.x + "em",
            backgroundColor: "#C00",
            backgroundSize: "100%",
            backgroundImage: this.state.image ? "url(" + this.state.image + ")" : null
        }
    },
    onDrag: function(event) {
        event.preventDefault()
        event.stopPropagation()
    },
    onDrop: function(event) {
        event.preventDefault()
        event.stopPropagation()
        var file = event.dataTransfer.files[0]
        
        var reader = new FileReader()
        reader.onload = function(event) {
            this.setState({
                image: event.target.result
            })
        }.bind(this)
        reader.readAsDataURL(file)
    }
})

module.exports = Box
