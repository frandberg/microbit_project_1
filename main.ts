



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

function create_message(reciever: number, kind: number, contents: string) {
    _message = "" + reciever + "|" + kind + "|" + contents
    return _message
}
function get_message_contents (message: string) {
    for (let _k = 0; _k <= message.length - 1; _k++) {
        if (message.charAt(_k) == "|") {
            _delimeters_found2 += 1
            if (_delimeters_found2 == 2) {
                return message.substr(_k + 1, message.length - _k)
            } else {
                _last_delimeter_index = _k
            }
        }
    }
    return ""
}
function get_message_kind (message: string) {
    for (let _j = 0; _j <= message.length - 1; _j++) {
        if (message.charAt(_j) == "|") {
            _delimeters_found += 1
            if (_delimeters_found == 2) {
                return parseInt(message.substr(_last_delimeter_index + 1, _j))
            } else {
                _last_delimeter_index = _j
            }
        }
    }
    return -1
}
function get_message_reciever(message: string) {
    for (let _i = 0; _i <= message.length - 1; _i++) {
        if (message.charAt(_i) == "|") {
            return parseInt(message.substr(0, _i))
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
    let _reciever = get_message_reciever(msg)
    if(_reciever == serial_number){
        if(role == ROLE_DEALER){
            msg_recieved_dealer(
            radio.receivedPacket(RadioPacketProperty.SerialNumber), 
            get_message_kind(msg),
            get_message_contents(msg),
            )
        }
        else{
                msg_recieved_player(
                    radio.receivedPacket(RadioPacketProperty.SerialNumber),
                    get_message_kind(msg),
                    get_message_contents(msg),
                )
            
        }
    }
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

function msg_recieved_dealer(sender: number, msg_kind: number, msg_contents: string){
    
}
function msg_recieved_player(sender: number, msg_kind: number, msg_contents: string){

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
let _last_delimeter_index_contents = 0
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
let serial_number = control.deviceSerialNumber()
let my_message = create_message(serial_number, 1, "this")
let my_reciever = get_message_reciever(my_message)
let my_kind = get_message_kind(my_message)
let my_contents = get_message_contents(my_message)

basic.showNumber(my_reciever)

