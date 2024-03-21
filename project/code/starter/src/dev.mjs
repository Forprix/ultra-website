import cp from 'child_process'
import { execFileAsync } from './util.mjs'

;(async () => {

    console.log('Initializing...')

    await Promise.all([
        execFileAsync('bash', ['./bash/script1.sh']),
        execFileAsync('bash', ['./bash/script2.sh'])
    ])

    console.log('Initialized!')
    console.log('Starting server...')

    execFileAsync('bash', ['./bash/script5.sh'])
    cp.execFileSync('bash', ['./bash/script6.sh'], {
        stdio: 'inherit'
    })
})()

