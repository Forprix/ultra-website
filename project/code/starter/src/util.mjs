import cp from 'child_process'

/**
* @returns {Promise<number>}
*/
export function execAsync(...args) {
   return new Promise(res => {
       const p = cp.exec(...args)
       p.stdout.on('data', data => process.stdout.write(data))
       p.stderr.on('data', data => process.stdout.write(data))
       p.on('exit', res)
   })
}