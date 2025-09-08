delat_time = 0
last_time = 0
velocity = 0
position = 0
def build_card_list():
    pass

def on_forever():
    global delat_time, velocity, position, last_time
    delat_time = input.running_time() - last_time
    velocity = input.acceleration(Dimension.X) * 0.00982 * (delat_time / 1000)
    position = position + velocity * delat_time
    last_time = input.running_time()
basic.forever(on_forever)
