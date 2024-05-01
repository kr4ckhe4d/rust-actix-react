import { Vector3 } from "@react-three/fiber"

const MIN_RADIUS = 7.5
const MAX_RADIUS = 15
const DEPTH = 2
const LEFT_COLOR = "F79A00"
const RIGHT_COLOR = "FD12D1"
const NUM_POINTS = 2500

const getGradientStop = (ratio: number, leftColor: string, rightcolor: string) => {
    // For outer ring numbers potentially past max radius,
    // just clamp to 0
    ratio = ratio > 1 ? 1 : ratio < 0 ? 0 : ratio;

    const c0 = leftColor.match(/.{1,2}/g)!.map(
        (oct) => parseInt(oct, 16) * (1 - ratio)
    );
    const c1 = rightcolor.match(/.{1,2}/g)!.map(
        (oct) => parseInt(oct, 16) * ratio
    );
    const ci = [0, 1, 2].map((i) => Math.min(Math.round(c0[i] + c1[i]), 255));
    const color = ci
        .reduce((a, v) => (a << 8) + v, 0)
        .toString(16)
        .padStart(6, "0");

    return `#${color}`;
};

const randomFromInterval = (min: number, max: number) => {
    return Math.random() * (max - min) + min
}

const calculateColor = (x: number) => {
    const maxDiff = MAX_RADIUS * 2
    const distance = x + MAX_RADIUS

    const radius = distance / maxDiff

    const stop = getGradientStop(radius, LEFT_COLOR, RIGHT_COLOR)

    return stop
}


export const pointsInner = Array.from(
    { length: NUM_POINTS },
    (v, k) => k + 1
).map((num) => {
    const randomRadius = randomFromInterval(MIN_RADIUS, MAX_RADIUS)
    const randomAngle = Math.random() * Math.PI * 2

    const x = Math.cos(randomAngle) * randomRadius
    const y = Math.sin(randomAngle) * randomRadius
    const z = randomFromInterval(-DEPTH, DEPTH)

    const color = calculateColor(x)

    return {
        idx: num,
        position: [x, y, z] as Vector3,
        color
    }
})