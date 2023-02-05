import mongoose, { ConnectOptions } from 'mongoose';

const connect = async() => {
    mongoose.set('strictQuery', false)
    try {
        await mongoose.connect(process.env.MONGO_URI as string, {
        useUnifiedTopology: true,
        } as ConnectOptions);
        console.log('[DB] Database connected successfully');
    } catch (error) {
        console.log(error)
        console.log('Database connection failed');
    }
}

export default connect;