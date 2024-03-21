import express from 'express'
import cp from 'child_process'
import { execAsync } from './util.mjs'

;(async () => {
    const app = express()
    app.use(express.static('public'))
    const server = app.listen(3000, () => {
        console.log('http://localhost')
    })

    console.log('Initializing...')
    
    await Promise.all([
        execAsync('bash "./bash/script1.sh"'),
        execAsync('bash "./bash/script2.sh"')
    ])

    console.log('Initialized!')
    console.log('Building...')

    await Promise.all([
        execAsync('bash "./bash/script7.sh"'),
        execAsync('bash "./bash/script8.sh"')
    ])

    console.log('Built!')
    // console.log('Starting server...')

    // execAsync('bash', ['./bash/script3.sh'])
    
    // server.close()

    // cp.execSync('bash', ['./bash/script4.sh'], {
    //     stdio: 'inherit'
    // })
})()

