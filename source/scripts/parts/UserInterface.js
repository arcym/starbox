var UserInterface = React.createClass({
    render: function() {
        if(this.props.data.box) {
            return (
                <div style={this.styles.container}>
                    <div>
                        {this.props.data.box.name}
                    </div>
                    <div style={this.styles.description}>
                        {this.props.data.box.description}
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
            padding: "0.25em",
            position: "absolute"
        },
        description: {
            fontSize: "0.5em"
        }
    }
})

module.exports = UserInterface
