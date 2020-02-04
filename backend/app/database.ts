import mongoose from 'mongoose'

export const databaseConnection = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log('Base de datos conectada')
    }catch(err){
        console.log(err)
    }
}