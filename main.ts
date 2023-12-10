enum RadioMessage {
    message1 = 49434,
    handshake = 8146
}
let leftDistance = 0
let rightDistance = 0
let distance = 0
let right = 0
let left = 0
function turnLeft () {
    for (let index = 0; index < 5; index++) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 255)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 255)
        basic.pause(50)
        maqueen.motorStop(maqueen.Motors.All)
    }
}
function turnRight () {
    for (let index = 0; index < 5; index++) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 255)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 255)
        basic.pause(50)
        maqueen.motorStop(maqueen.Motors.All)
    }
}
function findPath () {
    turnLeft()
    leftDistance = maqueen.Ultrasonic(PingUnit.Centimeters)
    basic.pause(1000)
    turnRight()
    basic.pause(100)
    turnRight()
    basic.pause(100)
    rightDistance = maqueen.Ultrasonic(PingUnit.Centimeters)
    basic.pause(1000)
    turnLeft()
    basic.pause(100)
}
basic.forever(function () {
    distance = maqueen.Ultrasonic(PingUnit.Centimeters)
    if (distance > 10) {
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 200)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 255)
    } else {
        maqueen.motorStop(maqueen.Motors.All)
        findPath()
        if (rightDistance >= leftDistance) {
            if (right >= 2) {
                turnLeft()
                right += -1
                left += 1
                basic.pause(100)
            } else {
                turnRight()
                left += -1
                right += 1
                basic.pause(100)
            }
        } else {
            if (left >= 2) {
                turnRight()
                left += -1
                right += 1
                basic.pause(100)
            } else {
                turnLeft()
                right += -1
                left += 1
                basic.pause(100)
            }
        }
    }
})
