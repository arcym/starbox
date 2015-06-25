var UserInterface = React.createClass({
    render: function() {
        if(this.props.data.box) {
            return (
                <div style={this.styles.container}>
                    <div style={this.styles.section}>
                        <div style={this.styles.name}>
                            {this.props.data.box.name}
                        </div>
                        <div style={this.styles.description}>
                            {this.props.data.box.description}
                        </div>
                    </div>
                </div>
            )
        } else {
            return <div/>
        }
    },
    styles: {
        container: {
            left: "0em",
            bottom: "0em",
            display: "table",
            padding: "0.5em",
            position: "absolute"
        },
        section: {
            display: "table-cell",
            paddingRight: "0.25em",
            verticalAlign: "bottom"
        },
        name: {
            fontSize: "1em"
        },
        description: {
            fontSize: "0.5em"
        }
    }
})

var Box = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}/>
        )
    },
    renderStyles: function() {
        return {
            width: 1.75 + "em",
            height: 1.75 * (this.props.data.height / this.props.data.width) + "em",
            backgroundColor: this.props.data.color
        }
    }
})

module.exports = UserInterface
