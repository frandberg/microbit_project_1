
function build_card_list () {
    cards = []
    i = 0
    for (let suit of suits) {
        for (let card_value of card_values) {
            cards.push("" + suit + card_value)
            i += 1
        }
        for (let card_value of card_values_alpha) {
            cards.push("" + suit + card_value)
            i += 1
        }
    }
}
let hejsan = ""
let last_time = 0
let i = 0
let cards: string[] = []
let card_values: number[] = []
let card_values_alpha: string[] = []
let suits: string[] = []
let velocity = 0
let position = 0
let delat_time = 0
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
    delat_time = input.runningTime() - last_time
    velocity = input.acceleration(Dimension.X) * 0.00982 * (delat_time / 1000)
    position = position + velocity * delat_time
    last_time = input.runningTime()
  
    hejsan = "HEJSAN"
    basic.showNumber(Math.round(position))
})
