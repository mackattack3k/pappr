const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const randomValueFromArray = (array: any[]) => {
    const pos = randomIntFromInterval(0, array.length - 1)
    return array[pos]
}

const isDev = process.env.NODE_ENV === 'development'
export const devLog = (l: any) => {
    if (!isDev) {
        return
    }
    console.log(l)
}
