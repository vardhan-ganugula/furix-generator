import mongoose from 'mongoose';

async function connect() {
    const MONGODB_URI = process.env.MONGODB_URI;
    if(!MONGODB_URI) {
        console.error('No MONGODB_URI provided');
        return
    }
    const connection = mongoose.connection.readyState;
    if(connection === 1) {
        console.log('DB already connected');
        return;
    }
    if(connection ==2) {
        console.log('DB is connecting');
        return;
    }
    try{
        await mongoose.connect(MONGODB_URI);
        console.log('DB connected');
    }catch(err){
        console.error('DB connection error', err);
    }
    
}

export default connect;