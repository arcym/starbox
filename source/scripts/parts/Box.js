var Box = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}>
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
        if(Array.isArray(this.props.data.dimensions)) {
            var renderings = new Array()
            for(var index in this.props.data.dimensions) {
                var boxdim = this.props.data.dimensions[index]
                renderings.push(
                    <Boxdim data={boxdim} key={index}/>
                )
            }
            return renderings
        } else {
            var boxdim = this.props.data.dimensions
            return (
                <Boxdim data={boxdim}/>
            )
        }
    },
    onMouseOver: function() {
        this.props.data.onMouseOver()
    },
    onMouseOut: function() {
        this.props.data.onMouseOut()
    }
    /*colors: {
        "blue": "0em 0em",
        "green": "0em 1em",
        "yellow": "1em 0em",
        "purple": "1em 1em"
    }*/
    //backgroundSize: "2em 2em",
    //backgroundPosition: this.colors[this.props.data.color],
    //backgroundImage: "url(assets/images/" + this.props.data.type + ".png)",
})

var Boxdim = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}/>
        )
    },
    renderStyles: function() {
        return {
            position: "absolute",
            top: (this.props.data.y || 0) + "em",
            left: (this.props.data.x || 0) + "em",
            width: (this.props.data.width || 1) + "em",
            height: (this.props.data.height || 1) + "em",
            backgroundColor: this.props.data.color
        }
    }
})

module.exports = Box
