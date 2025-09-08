// "dealer" or "player"
input.onButtonPressed(Button.A, function () {
    if (game_stage == "role_selection") {
        role = "dealer"
        basic.showString("D")
        game_stage = "starting"
    }
})
input.onButtonPressed(Button.B, function () {
    if (game_stage == "role_selection") {
        role = "player"
        basic.showString("P")
        game_stage = "starting"
    }
})
let role = ""
let game_stage = ""
basic.showString("A=dealer,B=player")
// role_selection, etc
game_stage = "role_selection"
// role_selection, etc
basic.forever(function () {
	
})
