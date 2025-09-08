function scramble_cards () {
    scrambled_cards = []
    _temp_cards = cards
    _rand = 0
    while (_temp_cards.length != 0) {
        _rand = randint(0, _temp_cards.length - 1)
        datalogger.log(
        datalogger.createCV("_rand", _rand),
        datalogger.createCV("_temp_cards len", _temp_cards.length)
        )
        _value = _temp_cards[_rand]
        _temp_cards.removeAt(_rand)
        scrambled_cards.push(_value)
    }
}
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
    if (game_stage == GAME_STAGE_ROLE_SELECTION) {
        select_role(ROLE_DEALER)
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
function init_constants () {
    GAME_STAGE_ROLE_SELECTION = 0
    GAME_STAGE_FINDING_PLAYERS = 1
    ROLE_DEALER = 0
    ROLE_PLAYER = 1
}
input.onButtonPressed(Button.B, function () {
    if (game_stage == 0) {
        select_role(ROLE_PLAYER)
    }
})
function select_role (role: number) {
    game_stage = GAME_STAGE_FINDING_PLAYERS
    role = role
    led.stopAnimation()
    if (role == ROLE_DEALER) {
        _display_char = "D"
    } else if (role == ROLE_PLAYER) {
        _display_char = "P"
    } else {
        _display_char = "ERROR"
    }
    basic.showString(_display_char)
}
let _display_char = ""
let role = 0
let ROLE_PLAYER = 0
let GAME_STAGE_FINDING_PLAYERS = 0
let i = 0
let ROLE_DEALER = 0
let card_values: number[] = []
let card_values_alpha: string[] = []
let suits: string[] = []
let _value = ""
let _rand = 0
let cards: string[] = []
let _temp_cards: string[] = []
let scrambled_cards: string[] = []
let GAME_STAGE_ROLE_SELECTION = 0
let game_stage = 0
init_constants()
game_stage = GAME_STAGE_ROLE_SELECTION
init_list_values()
build_card_list()
scramble_cards()
while (game_stage == GAME_STAGE_ROLE_SELECTION) {
    basic.showString("A=DEALER,B=PLAYER")
}
basic.forever(function () {
    if (role == ROLE_PLAYER) {
    	
    } else if (role == ROLE_DEALER) {
    	
    } else {
    	
    }
})
