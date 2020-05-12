
// see https://github.com/danfinlay/jazzicon
'use strict'
import MersenneTwister = require('mersenne-twister')

const allColors = [
    'rgb(244, 67, 54)',
    'rgb(233, 30, 99)',
    'rgb(156, 39, 176)',
    'rgb(103, 58, 183)',
    'rgb(63, 81, 181)',
    'rgb(33, 150, 243)',
    'rgb(3, 169, 244)',
    'rgb(0, 188, 212)',
    'rgb(0, 150, 136)',
    'rgb(76, 175, 80)',
    'rgb(139, 195, 74)',
    'rgb(205, 220, 57)',
    'rgb(255, 193, 7)',
    'rgb(255, 152, 0)',
    'rgb(255, 87, 34)']

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
    const style = `<style>circle{mix-blend-mode:soft-light;}</style>`
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

        shapesStr += `<circle r="${r}" cx="${cx}" cy="${cy}" fill="${fill}"/>`
    }
    return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${style}${bgStr}${shapesStr}</svg>`
}