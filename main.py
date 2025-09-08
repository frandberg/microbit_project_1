def test():
    global y, x
    while x < 5:
        while y < 5:
            led.plot(x, y)
            y = y + 1
            basic.pause(50)
        x = x + 1
last_time = 0
y = 0
x = 0
velocity = 0
position = 0
delat_time = 0
test()

def on_forever():
    global delat_time, velocity, position, last_time
    delat_time = input.running_time() - last_time
    velocity = input.acceleration(Dimension.X) * 0.00982 * (delat_time / 1000)
    position = position + velocity * delat_time
    last_time = input.running_time()
    basic.show_number(Math.round(position))
basic.forever(on_forever)
