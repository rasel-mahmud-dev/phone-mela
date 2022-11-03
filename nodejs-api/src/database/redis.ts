const { createClient } = require('redis');

export function redisConnect(){
    return new Promise( async (resolve, reject)=>{
        
        let client  = await createClient( {
            url: `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_ENDPOINT}:${process.env.REDIS_PORT}`
        });
        
        await client.on('error', (err) =>{
            reject(new Error("Redis Client Connection error"))
        });
        
        await client.connect();
        console.log("redis connected...")
        resolve(client)
    })
}


export default redisConnect

