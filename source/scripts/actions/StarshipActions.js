var StarshipActions = Reflux.createActions([
	"StarshipAccelerate", "StarshipDeaccelerate",
	"StarshipRotateLeft", "StarshipRotateRight",
	"StarshipMove", "StarshipFireTurrets",
	"StarshipExplode", "DestroyModule", "DestroyStarship"
])

module.exports = StarshipActions
