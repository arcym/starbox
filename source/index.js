window.React = require("react")
window.Phlux = require("phlux")

window.Keyb = require("keyb")
window.Tickly = require("tickly")

window.WIDTH = 20
window.HEIGHT = 15

var GameFrame = require("<scripts>/parts/GameFrame")
var UserInterface = require("<scripts>/parts/UserInterface")
var UserStore = require("<scripts>/stores/UserStore")

var Box = require("<scripts>/parts/Box")
var Star = require("<scripts>/parts/Star")
var Starship = require("<scripts>/parts/Starship")
var BoxStore = require("<scripts>/stores/BoxStore")
var StarStore = require("<scripts>/stores/StarStore")
var StarshipStore = require("<scripts>/stores/StarshipStore")

var Shapes = require("<scripts>/data/Shapes")

var ShapeList = React.createClass({
    render: function() {
        return (
            <div style={this.style}>
                {this.renderShapes()}
            </div>
        )
    },
    style: {
        top: "0em",
        right: "0em",
        fontSize: "0.5em",
        padding: "0.5em",
        position: "absolute",
        backgroundColor: "#444",
        overflowX: "hidden",
        overflowY: "scroll",
        maxHeight: "100%"
    },
    renderShapes: function() {
        var renderings = []
        for(var key in Shapes) {
            renderings.push(
                <Shape key={key}
                    data={Shapes[key]}/>
            )
        }
        return renderings
    }
})

var BoxClass = require("<scripts>/classes/Box")

var Shape = React.createClass({
    render: function() {
        return (
            <div style={this.style}
                onClick={this.onClick}>
                {this.renderSubshapes()}
            </div>
        )
    },
    style: {
        width: "5em",
        height: "5em",
        position: "relative",
        marginBottom: "1em",
        backgroundSize: "100%",
        backgroundImage: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wYeDgA1TBc4fwAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAf0lEQVRo3u3ZQQ7AIAhEUerFenZu1gt0ZdqI+GZtYr4wTIgR9Kp71cWjywuOLhUe1VtGa+06FFSkmq4djR0R+XdPrzrHI0CAAAEC5PNkb53wkp1HgAABAsTO3mVfl+w8AgQIECBH7+zVU34q4SV7NY8ks28KknGYfE+3B6FqegDkOAr8roASsAAAAABJRU5ErkJggg==)"
    },
    renderSubshapes: function() {
        var renderings = []
        for(var index in this.props.data) {
            renderings.push(
                <Subshape key={index}
                    data={this.props.data[index]}/>
            )
        }
        return renderings
    },
    onClick: function() {
        var data = JSON.parse(JSON.stringify(this.props.data))
        StarshipStore.data.me.boxes = [
            new BoxClass({
                shape: data,
                position: {
                    x: 0,
                    y: 0
                }
            })
        ]
        StarshipStore.trigger()
        console.log("!")
    }
})

var Subshape = React.createClass({
    render: function() {
        return (
            <div style={this.style()}/>
        )
    },
    style: function() {
        return {
            position: "absolute",
            left: this.props.data.x + 2 + "em",
            top: this.props.data.y + 2 + "em",
            backgroundColor: "#C00",
            width: "0.9em",
            height: "0.9em"
        }
    }
})

var ShapeData = React.createClass({
    render: function() {
        return (
            <div style={this.style}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={"T5-" + Math.random().toFixed(2).substring(2,4)}/>
                </div>
                <br/>
                <div>
                    <label>Type:</label>
                    <select>
                        <option>Hull</option>
                        <option>Weapon</option>
                        <option>System</option>
                        <option>Engine</option>
                    </select>
                </div>
                <br/>
                <div>
                    <label htmlFor="description">Details:</label>
                    <textarea></textarea>
                </div>
            </div>
        )
    },
    style: {
        top: 0,
        bottom: 0,
        width: "5em",
        fontSize: "0.75em",
        padding: "0.25em",
        position: "absolute",
        backgroundColor: "#444"
    }
})

var Starbox = React.createClass({
    mixins: [
        Phlux.connectStore(BoxStore, "boxes"),
        Phlux.connectStore(StarStore, "stars"),
        Phlux.connectStore(StarshipStore, "starships"),
        Phlux.connectStore(UserStore, "user"),
    ],
    render: function() {
        return (
            <GameFrame aspect-ratio="20x15">
                <div>{this.renderEntities(Star, this.state.stars)}</div>
                <div>{this.renderEntities(Starship, this.state.starships)}</div>
                <ShapeData/>
                <ShapeList/>
            </GameFrame>
        )
    },
    renderEntities: function(Class, data) {
        var renderings = []
        for(var index in data) {
            renderings.push(
                <Class key={index}
                    data={data[index]}/>
            )
        }
        return renderings
    },
    componentDidMount: function() {
        Tickly.loop(function(tick) {
        })
    }
})

React.render(<Starbox/>, document.body)
