def init_list_values():
    global suits, card_values_alpha, card_values
    suits = ["H", "D", "C", "S"]
    card_values_alpha = ["J", "Q", "K", "A"]
    card_values = [2, 3, 4, 5, 6, 7, 8, 9, 10]

def on_button_pressed_a():
    global role, game_stage
    if game_stage == "role_selection":
        role = "dealer"
        basic.show_string("D")
        game_stage = "starting"
input.on_button_pressed(Button.A, on_button_pressed_a)

def build_card_list():
    global cards, i
    cards = []
    i = 0
    for suit in suits:
        for card_value in card_values:
            cards.append("" + suit + str(card_value))
            i += 1
        for card_value2 in card_values_alpha:
            cards.append("" + suit + card_value2)
            i += 1

def on_button_pressed_b():
    global role, game_stage
    if game_stage == "role_selection":
        role = "player"
        basic.show_string("P")
        game_stage = "starting"
input.on_button_pressed(Button.B, on_button_pressed_b)

"""

"dealer" or "player"

"""
i = 0
role = ""
card_values: List[number] = []
card_values_alpha: List[str] = []
suits: List[str] = []
cards: List[str] = []
game_stage = ""
game_stage = "role_selection"
basic.show_string("A=dealer,B=player")
init_list_values()
build_card_list()
for värde in cards:
    datalogger.log(datalogger.create_cv(värde, värde))

def on_forever():
    pass
basic.forever(on_forever)
