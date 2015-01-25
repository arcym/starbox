var GalaxyStarshipModules = function(affiliation) {
    return [
        {
            category: "hull",
            affiliation: affiliation,
            position: {
                x: -1,
                y: 0
            },
            damage: 3
        },
        {
            category: "hull",
            affiliation: affiliation,
            position: {
                x: 1,
                y: 0
            },
            damage: 3
        },
        {
            category: "hull",
            affiliation: affiliation,
            position: {
                x: 0,
                y: -1
            },
            damage: 3
        },
        {
            category: "hull",
            affiliation: affiliation,
            position: {
                x: 0,
                y: 1
            },
            damage: 3
        },
        {
            category: "turret",
            affiliation: affiliation,
            position: {
                x: 0,
                y: -2
            },
            damage: 3
        },
        {
            category: "engine",
            affiliation: affiliation,
            position: {
                x: -1,
                y: 1
            },
            damage: 3
        },
        {
            category: "engine",
            affiliation: affiliation,
            position: {
                x: 1,
                y: 1
            },
            damage: 3
        }
    ]
}

module.exports = GalaxyStarshipModules
