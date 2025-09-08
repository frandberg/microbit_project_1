let last_time = 0
let velocity = 0
let position = 0
let delat_time = 0
basic.forever(function () {
    delat_time = input.runningTime() - last_time
    velocity = input.acceleration(Dimension.X) * 0.00982 * (delat_time / 1000)
    position = position + velocity * delat_time
    last_time = input.runningTime()
})
