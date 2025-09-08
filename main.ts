/**
 * "dealer" or "player"
 */
function init_list_values () {
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
}
input.onButtonPressed(Button.A, function () {
    if (game_stage == "role_selection") {
        select_role("dealer")
    }
})
function build_card_list () {
    cards = []
    i = 0
    for (let suit of suits) {
        for (let card_value of card_values) {
            cards.push("" + card_value + suit)
            i += 1
        }
        for (let card_value2 of card_values_alpha) {
            cards.push("" + card_value2 + suit)
            i += 1
        }
    }
}
input.onButtonPressed(Button.B, function () {
    if (game_stage == "role_selection") {
        select_role("player")
    }
})
function select_role (role: string) {
    game_stage = "starting"
    role = role
    led.stopAnimation()
    if (role == "dealer") {
        _display_char = "D"
    } else if (role == "player") {
        _display_char = "P"
    } else {
        _display_char = "ERROR"
    }
    basic.showString(_display_char)
}
let _display_char = ""
let role = ""
let i = 0
let card_values: number[] = []
let card_values_alpha: string[] = []
let suits: string[] = []
let cards: string[] = []
let game_stage = ""
game_stage = "role_selection"
init_list_values()
build_card_list()
for (let värde of cards) {
    datalogger.log(datalogger.createCV(värde, värde))
}
basic.forever(function () {
    while (game_stage == "role_selection") {
        basic.showString("A=DEALER,B=PLAYER")
    }
})
