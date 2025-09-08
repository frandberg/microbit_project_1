input.onButtonPressed(Button.A, function () {
    if (game_stage == "role_selection") {
        role = "dealer"
        basic.showString("D")
        game_stage = "starting"
    }
})
function build_card_list () {
    cards = []
    i = 0
    for (let suit of suits) {
        for (let card_value of card_values) {
            cards.push("" + suit + card_value)
            i += 1
        }
        for (let card_value2 of card_values_alpha) {
            cards.push("" + suit + card_value2)
            i += 1
        }
    }
}
input.onButtonPressed(Button.B, function () {
    if (game_stage == "role_selection") {
        role = "player"
        basic.showString("P")
        game_stage = "starting"
    }
})
/**
 * "dealer" or "player"
 */
let i = 0
let role = ""
let cards: string[] = []
let card_values: number[] = []
let card_values_alpha: string[] = []
let suits: string[] = []
let game_stage = ""
game_stage = "role_selection"
basic.showString("A=dealer,B=player")
suits = [
"H",
"D",
"C",
"S"
]
card_values_alpha = [
"J",
"Q",
"K",
"A"
]
card_values = [
2,
3,
4,
5,
6,
7,
8,
9,
10
]
build_card_list()
for (let värde of cards) {
    datalogger.log(datalogger.createCV(värde, värde))
}
basic.forever(function () {
	
})
