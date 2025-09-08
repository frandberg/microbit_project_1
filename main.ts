function test () {
    while (x < 5) {
        while (y < 5) {
            led.plot(x, y)
            y = y + 1
            basic.pause(50)
        }
        x = x + 1
    }
}
let last_time = 0
let y = 0
let x = 0
let velocity = 0
let position = 0
let delat_time = 0
test()
basic.forever(function () {
    delat_time = input.runningTime() - last_time
    velocity = input.acceleration(Dimension.X) * 0.00982 * (delat_time / 1000)
    position = position + velocity * delat_time
    last_time = input.runningTime()
    basic.showNumber(Math.round(position))
})
