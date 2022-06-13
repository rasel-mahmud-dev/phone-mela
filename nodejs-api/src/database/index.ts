
const { Client } = require("cassandra-driver");

async function connectDB() {
  const client = new Client({
    cloud: {
      secureConnectBundle: "secure-connect-question-db.zip",
    },
    credentials: {
      username: process.env.CLIENT_ID,
      password: process.env.CLIENT_SECRET,
    },
  });
  
  return new Promise<any>(async function (resolve, reject){
    try {
      await client.connect();
    
      // Execute a query
      // const rs = await client.execute("SELECT * FROM system.local");
      // console.log(`Your cluster returned ${rs.rowLength} row(s)`);
      
      resolve(client)
    
    } catch (ex){
      reject(false)
      console.log(ex)
    } finally {
      // await client.shutdown();
    }
  })
}

export default connectDB

