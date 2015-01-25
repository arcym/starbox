var GalaxyStarshipModules = function(affiliation) {
    return {
        "1": {
            category: "hull",
            affiliation: affiliation,
            position: {
                x: -1,
                y: 0
            },
            damage: 3
        },
        "2": {
            category: "hull",
            affiliation: affiliation,
            position: {
                x: 1,
                y: 0
            },
            damage: 3
        },
        "3": {
            category: "hull",
            affiliation: affiliation,
            position: {
                x: 0,
                y: -1
            },
            damage: 3
        },
        "4": {
            category: "hull",
            affiliation: affiliation,
            position: {
                x: 0,
                y: 1
            },
            damage: 3
        },
        "3.1": {
            category: "turret",
            affiliation: affiliation,
            position: {
                x: 0,
                y: -2
            },
            damage: 3
        },
        "1.1": {
            category: "engine",
            affiliation: affiliation,
            position: {
                x: -1,
                y: 1
            },
            damage: 3
        },
        "2.1": {
            category: "engine",
            affiliation: affiliation,
            position: {
                x: 1,
                y: 1
            },
            damage: 3
        }
    }
}

module.exports = GalaxyStarshipModules
