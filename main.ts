function send_message (reciever: number, kind: number, contents: string) {
    radio.sendString("" + reciever + "|" + kind + "|" + contents)
}
// "dealer" or "player"
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
    for (let _k = 0; _k <= message.length - 1; _k++) {
        if (message.charAt(_k) == "|") {
            _delimeters_found += 1
            if (_delimeters_found == 2) {
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
            _delimeters_found2 += 1
            if (_delimeters_found2 == 2) {
                return parseInt(message.substr(_last_delimeter_index2 + 1, _j))
            } else {
                _last_delimeter_index2 = _j
            }
        }
    }
    return -1
}
input.onButtonPressed(Button.A, function () {
    if (game_stage == GAME_STAGE_ROLE_SELECTION) {
        select_role(ROLE_DEALER)
    }
})
radio.onReceivedString(function (msg) {
    // Dealer receives join requests while finding players
    _reciever = get_message_reciever(msg)
    if (_reciever == serial_number) {
        if (role == ROLE_DEALER) {
            msg_recieved_dealer(radio.receivedPacket(RadioPacketProperty.SerialNumber), get_message_kind(msg), get_message_contents(msg))
        } else if (role == ROLE_PLAYER) {
            msg_recieved_player(radio.receivedPacket(RadioPacketProperty.SerialNumber), get_message_kind(msg), get_message_contents(msg))
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

function add_player(player_id: number){
    players.push(player_id)
}
function get_player_index(player_id: number): number{
    for (let _l = 0; _l < players.length; _l++){
        if(players[_l] == player_id){
            return _l
        }
    }
    return -1
}


function msg_recieved_dealer (sender: number, msg_kind: number, msg_contents: string) {
	if(msg_kind == MSG_PLAYER_JOIN){
        add_player(radio.receivedPacket(RadioPacketProperty.SerialNumber))
    }
}
input.onButtonPressed(Button.B, function () {
    if (game_stage == GAME_STAGE_ROLE_SELECTION) {
        select_role(ROLE_PLAYER)
        send_message(0, MSG_PLAYER_JOIN, "")

        
    }
})
function msg_recieved_player (sender: number, msg_kind: number, msg_contents: string) {
    
}
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
let GAME_STAGE_FINDING_PLAYERS = 0
let GAME_STAGE_ROLE_SELECTION = 0

let i = 0
let _reciever = 0
let _last_delimeter_index2 = 0
let _delimeters_found2 = 0
let _last_delimeter_index = 0
let _delimeters_found = 0
let card_values: number[] = []
let card_values_alpha: string[] = []
let suits: string[] = []
let _message = ""
let cards: string[] = []
let dealer_id = 0

let game_stage = 0
let role = 0
let ROLE_DEALER = 0
let ROLE_PLAYER = 1
let MSG_PLAYER_JOIN = 0
let serial_number = 0
serial_number = control.deviceSerialNumber()
role = ROLE_DEALER
let players : number[] = []
init_constants()
game_stage = GAME_STAGE_ROLE_SELECTION
init_list_values()
build_card_list()

for (let värde of cards) {
    datalogger.log(datalogger.createCV(värde, värde))
}
while (game_stage == GAME_STAGE_ROLE_SELECTION) {
    basic.showString("A=DEALER,B=PLAYER")
}
basic.forever(function () {
    if (role == ROLE_PLAYER) {
    	
    } else {
    	
    }
})
