import mongoose from 'mongoose';

export async function connectDB() {
    try {
        mongoose.connect(process.env.MONGODB_URI as string)
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('Connected to the database successfully');
        });
        connection.on('error', (error) => {
            console.error('Error connecting to the database', error.message);
            process.exit(1);
        });
    } catch (error:any) {
        console.error('Error connecting to the database. Exiting process', error.message);
    }    
    
}