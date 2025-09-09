def create_message(reciever: number, kind: number, contents: str):
    global _message
    _message = "" + str(reciever) + "|" + str(kind) + "|" + contents
    return _message
def scramble_cards():
    global scrambled_cards, _temp_cards, _rand, _value
    scrambled_cards = []
    _temp_cards = cards
    _rand = 0
    while len(_temp_cards) != 0:
        _rand = randint(0, len(_temp_cards) - 1)
        datalogger.log(datalogger.create_cv("_rand", _rand),
            datalogger.create_cv("_temp_cards len", len(_temp_cards)))
        _value = _temp_cards[_rand]
        _temp_cards.remove_at(_rand)
        scrambled_cards.append(_value)
# "dealer" or "player"
def init_list_values():
    global suits, card_values_alpha, card_values
    suits = ["H", "D", "C", "S"]
    card_values_alpha = ["J", "Q", "K", "A"]
    card_values = [2, 3, 4, 5, 6, 7, 8, 9, 10]
def get_message_contents(message: str):
    global _delimeters_found, _last_delimeter_index
    _k = 0
    while _k <= len(message) - 1:
        if message.char_at(_k) == "|":
            _delimeters_found += 1
            if _delimeters_found == 2:
                return message.substr(_k + 1, len(message) - _k)
            else:
                _last_delimeter_index = _k
        _k += 1
    return ""
def get_message_kind(message2: str):
    global _delimeters_found2, _last_delimeter_index2
    _j = 0
    while _j <= len(message2) - 1:
        if message2.char_at(_j) == "|":
            _delimeters_found2 += 1
            if _delimeters_found2 == 2:
                return int(message2.substr(_last_delimeter_index2 + 1, _j))
            else:
                _last_delimeter_index2 = _j
        _j += 1
    return -1

def on_button_pressed_a():
    if game_stage == GAME_STAGE_ROLE_SELECTION:
        select_role(ROLE_DEALER)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_received_string(msg):
    global _reciever
    # Dealer receives join requests while finding players
    _reciever = get_message_reciever(msg)
    if _reciever == serial_number:
        if role2 == ROLE_DEALER:
            msg_recieved_dealer(radio.received_packet(RadioPacketProperty.SERIAL_NUMBER),
                get_message_kind(msg),
                get_message_contents(msg))
        elif role2 == ROLE_PLAYER:
            msg_recieved_player(radio.received_packet(RadioPacketProperty.SERIAL_NUMBER),
                get_message_kind(msg),
                get_message_contents(msg))
radio.on_received_string(on_received_string)

def get_message_reciever(message3: str):
    _i = 0
    while _i <= len(message3) - 1:
        if message3.char_at(_i) == "|":
            return int(message3.substr(0, _i))
        _i += 1
    return -1
def build_card_list():
    global cards, i
    cards = []
    i = 0
    for suit in suits:
        for card_value in card_values:
            cards.append("" + str(card_value) + suit)
            i += 1
        for card_value2 in card_values_alpha:
            cards.append("" + card_value2 + suit)
            i += 1
def init_constants():
    global GAME_STAGE_ROLE_SELECTION, GAME_STAGE_FINDING_PLAYERS, ROLE_DEALER, ROLE_PLAYER
    GAME_STAGE_ROLE_SELECTION = 0
    GAME_STAGE_FINDING_PLAYERS = 1
    ROLE_DEALER = 0
    ROLE_PLAYER = 1
def msg_recieved_dealer(sender: number, msg_kind: number, msg_contents: str):
    pass

def on_button_pressed_b():
    if game_stage == GAME_STAGE_ROLE_SELECTION:
        select_role(ROLE_PLAYER)
input.on_button_pressed(Button.B, on_button_pressed_b)

def msg_recieved_player(sender2: number, msg_kind2: number, msg_contents2: str):
    pass
def select_role(role: number):
    global game_stage, _display_char
    game_stage = GAME_STAGE_FINDING_PLAYERS
    role = role
    led.stop_animation()
    if role == ROLE_DEALER:
        _display_char = "D"
    elif role == ROLE_PLAYER:
        _display_char = "P"
    else:
        _display_char = "ERROR"
    basic.show_string(_display_char)
_display_char = ""
GAME_STAGE_FINDING_PLAYERS = 0
i = 0
_reciever = 0
_last_delimeter_index2 = 0
_delimeters_found2 = 0
_last_delimeter_index = 0
_delimeters_found = 0
card_values: List[number] = []
card_values_alpha: List[str] = []
suits: List[str] = []
_value = ""
_rand = 0
cards: List[str] = []
_temp_cards: List[str] = []
scrambled_cards: List[str] = []
_message = ""
GAME_STAGE_ROLE_SELECTION = 0
game_stage = 0
ROLE_DEALER = 0
role2 = 0
ROLE_PLAYER = 0
serial_number = 0
serial_number = control.device_serial_number()
ROLE_PLAYER = 1
role2 = ROLE_DEALER
init_constants()
game_stage = GAME_STAGE_ROLE_SELECTION
init_list_values()
build_card_list()
scramble_cards()
while game_stage == GAME_STAGE_ROLE_SELECTION:
    basic.show_string("A=DEALER,B=PLAYER")

def on_forever():
    if role2 == ROLE_PLAYER:
        pass
    elif role2 == ROLE_DEALER:
        pass
    else:
        pass
basic.forever(on_forever)
