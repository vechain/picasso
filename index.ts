
// see https://github.com/danfinlay/jazzicon
'use strict'
import MersenneTwister = require('mersenne-twister')

const allColors = [
    'rgb(226,27,12)',
    'rgb(192,19,78)',
    'rgb(125,31,141)',
    'rgb(82,46,146)',
    'rgb(50,65,145)',
    'rgb(11,122,209)',
    'rgb(2,135,195)',
    'rgb(0,150,170)',
    'rgb(0,120,109)',
    'rgb(61,140,64)',
    'rgb(112,162,54)',
    'rgb(174,188,33)',
    'rgb(210,157,0)',
    'rgb(204,122,0)',
    'rgb(231,55,0)']

const hash = function(str: string) {
    if (str.length === 0) {
        return 0
    }
    let h = 0
    for (let i = 0; i < str.length; i++) {
        h = h * 31 + str.charCodeAt(i)
        h = h % (2 ** 32)
    }
    return h
}

export function picasso(content: string) {
    const seed = hash(content)
    const rand = new MersenneTwister(seed)

    const colors = allColors.slice()
    const genColor = () => {
        const idx = Math.floor(colors.length * rand.random())
        return colors.splice(idx, 1)[0]
    }

    const bgStr = `<rect fill="${genColor()}" width="100" height="100"/>`
    let shapesStr = ''
    const layers = 3
    const rs = [35, 40, 45, 50, 55, 60]
    const cxs = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    const cys = [30, 40, 50, 60, 70]

    for (let i = 0; i < layers; i++) {
        const r = rs.splice(Math.floor(rs.length * rand.random()), 1)[0]
        const cx = cxs.splice(Math.floor(cxs.length * rand.random()), 1)[0]
        const cy = cys.splice(Math.floor(cys.length * rand.random()), 1)[0]
        const fill = genColor()

        shapesStr += `<circle r="${r}" cx="${cx}" cy="${cy}" fill="${fill}" opacity="0.5"/>`
    }
    return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${bgStr}${shapesStr}</svg>`
}