/* eslint-disable no-console */
import {Server} from "http";
import mongoose from "mongoose"
import app from "./app";
import { envVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/SeedSuperAdmin";
let server:Server;
const srartServer=async()=>{
try{
 console.log(envVars.NODE_ENV);  
await mongoose.connect(envVars.DB_URL)
server=app.listen(envVars.PORT,()=>{
    console.log(`Server is listening to port 5000 ${envVars.PORT}`);
})
}
catch(error){
console.log(error)
}
}
(async()=>{
await srartServer()
await seedSuperAdmin()
})()

process.on("SIGTERM",()=>{
    console.log("SIGTERM Signal received....Server shutting down");
    if(server){
        server.close(()=>{
          process.exit(1);   
        });
        process.exit(1);
    }
})
process.on("SIGINT",()=>{
    console.log("SIGINT Signal received....Server shutting down");
    if(server){
        server.close(()=>{
          process.exit(1);   
        });
        process.exit(1);
    }
})
process.on("unhandleRejection",(err)=>{
    console.log("unhandle Rejection detected....Server shutting down",err);
    if(server){
        server.close(()=>{
          process.exit(1);   
        });
        process.exit(1);
    }
})
process.on("uncaughtException",(err)=>{
    console.log("uncaught Exception detected....Server shutting down",err);
    if(server){
        server.close(()=>{
          process.exit(1);   
        });
        process.exit(1);
    }
})
// // Promise.reject(new Error("I forgot to catch this promise"))
// throw new Error("I forgot to handle this local error")
// unhandled rejection error
//uncaught rejection error
//uncaught exception error
//signal termination error
