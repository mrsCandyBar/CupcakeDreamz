class BuildOptions {

    constructor() {

        this.type = ["tall", "short"],
        this.hasWafer = ["true", ""],
        this.hasCream = ["true", ""],

        this.flavour = [
            "vanilla",
            "caramel-darker",
            "chocolate-darker"
        ],

        this.holder_type = [
            "dotted",
            "striped"
        ],

        this.holder_colour = [
            "yellow",
            "red-lighter",
            "purple",
            "green",
            "navy"
        ],

        this.icing_colour = [
            "special-vanilla",
            "red",
            "special-blue",
            "brown"
        ],

        this.icing_type = [
            "smooth",
            "run",
            "flared",
            "swirl"
        ],

        this.sprinkles_colour = [
            "yellow",
            "pink",
            "brown",
            "green"
        ],

        this.sprinkles_type = [
            "salt",
            "salt_single",
            "sprinkles",
            "sprinkles_single",
        ],

        this.topping = [
            "cherry",
            "strawberry",
            "citrus",
            "gumball",
            "candle",
            "heart",
            "flower"
        ]

        this.optional = [
            {
                selector: 'icing_type',
                selected_value: 'swirl',
                affected_selector: 'type',
                change_state: ['tall', 'short']
            },
            {
                selector: 'type',
                selected_value: 'tall',
                affected_selector: 'hasWafer',
                change_state: [true, false]
            },
            {
                selector: 'type',
                selected_value: 'short',
                affected_selector: 'hasCream',
                change_state: [true, false]
            }
        ]
    }
}

module.exports = new BuildOptions();