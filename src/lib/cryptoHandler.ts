import crypto from 'crypto'

export function getRandomName(bytes = 32) {
    return crypto.randomBytes(bytes).toString('hex')
}

export function getManyRandomNames(num: number, bytes = 32): string[] {

    if (Math.floor(num) < 1) {
        console.error('Paramter num needs to be one or greater!')
        return []
    }

    let names: string[] = []

    for (let i = 0; i < Math.floor(num); i++)
        names.push(getRandomName(bytes))

    return names
}