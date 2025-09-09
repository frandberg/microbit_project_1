function construct_msg (sender: number, reciever: number, msg: string) {
    let value = 0
    return value
}
// ===== HELPERS =====
function create_message (reciever: number, kind: number, contents: string) {
    _message = "" + reciever + "|" + kind + "|" + contents
    return _message
}
// ===== INIT LISTS / DECK =====
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
function get_message_contents (message: string) {
    let _last_delimeter_index_contents
for (let _k = 0; _k <= message.length - 1; _k++) {
        if (message.charAt(_k) == "|") {
            _delimeters_found2 += 1
            if (_delimeters_found2 == 3) {
                return parseInt(message.substr(_last_delimeter_index_contents, _k))
            } else {
                _last_delimeter_index = _k
            }
        }
    }
    return -1
}
function get_message_kind (message: string) {
    for (let _j = 0; _j <= message.length - 1; _j++) {
        if (message.charAt(_j) == "|") {
            _delimeters_found += 1
            if (_delimeters_found == 2) {
                return parseInt(message.substr(_last_delimeter_index, _j))
            } else {
                _last_delimeter_index = _j
            }
        }
    }
    return -1
}
// ===== INPUT =====
input.onButtonPressed(Button.A, function () {
    if (game_stage == GAME_STAGE_ROLE_SELECTION) {
        select_role(ROLE_DEALER)
    } else if (role == ROLE_PLAYER && game_stage == GAME_STAGE_FINDING_PLAYERS) {
        // Player asks to join the dealer's lobby
        // Use device serial as unique ID
        radio.sendString(PACKET_REQUEST_JOIN)
    }
})
// ===== RADIO =====
radio.onReceivedString(function (msg) {
    // Dealer receives join requests while finding players
    serial_number = radio.receivedPacket(RadioPacketProperty.SerialNumber)
    if (game_stage == GAME_STAGE_FINDING_PLAYERS && role == ROLE_DEALER) {
        if (msg == PACKET_REQUEST_JOIN) {
            if (!(contains(players, serial_number))) {
                players.push(serial_number)
                // give feedback: show number of joined players (0–9 loops)
                basic.showNumber(players.length % 10)
            }
        }
    }
})
function get_message_reciever (message: string) {
    for (let _i = 0; _i <= message.length - 1; _i++) {
        if (message.charAt(_i) == "|") {
            return parseInt(message.substr(0, _i))
        }
    }
    return -1
}
function build_card_list () {
    cards = []
    for (let s of suits) {
        for (let v of card_values) {
            cards.push("" + v + s)
        }
        for (let a of card_values_alpha) {
            cards.push("" + a + s)
        }
    }
}
function contains (arr: number[], value: number) {
    for (let x of arr) {
        if (x == value) {
            return true
        }
    }
    return false
}
input.onButtonPressed(Button.B, function () {
    if (game_stage == GAME_STAGE_ROLE_SELECTION) {
        select_role(ROLE_PLAYER)
    }
})
function select_role (newRole: number) {
    role = newRole
    game_stage = GAME_STAGE_FINDING_PLAYERS
    if (role == ROLE_DEALER) {
        // reset lobby
        players = []
        _display_char = "D"
    } else if (role == ROLE_PLAYER) {
        _display_char = "P"
    } else {
        _display_char = "ERR"
    }
    basic.showString(_display_char)
}
let _display_char = ""
let players: number[] = []
let serial_number = 0
let ROLE_DEALER = 0
let _delimeters_found = 0
let _last_delimeter_index = 0
let _delimeters_found2 = 0
let card_values: number[] = []
let card_values_alpha: string[] = []
let suits: string[] = []
let _message = ""
let cards: string[] = []
let GAME_STAGE_ROLE_SELECTION = 0
let game_stage = 0
let role = 0
let ROLE_PLAYER = 0
let GAME_STAGE_FINDING_PLAYERS = 0
let PACKET_REQUEST_JOIN = ""
let _last_delimeter_index2 = 0
// using name + numeric value with sendValue
PACKET_REQUEST_JOIN = "join"
// ===== CONFIG & CONSTANTS =====
let GROUP = 42
radio.setGroup(GROUP)
GAME_STAGE_FINDING_PLAYERS = 1
ROLE_PLAYER = 1
role = -1
// ===== STARTUP =====
game_stage = GAME_STAGE_ROLE_SELECTION
init_list_values()
build_card_list()
// Optional: log the deck once
for (let c of cards) {
    datalogger.log(datalogger.createCV(c, c))
}
// Show the role choice prompt once (no blocking loop)
basic.showString("A=DEALER B=PLAYER")
basic.forever(function () {
    // Later you can add game flow here.
    // Example feedback (non-blocking):
    if (role == ROLE_DEALER && game_stage == GAME_STAGE_FINDING_PLAYERS) {
        // e.g., flash a dot while waiting for joins
        led.toggle(0, 0)
        basic.pause(400)
    } else if (role == ROLE_PLAYER && game_stage == GAME_STAGE_FINDING_PLAYERS) {
        led.toggle(4, 0)
        basic.pause(400)
    } else {
        basic.pause(200)
    }
})
