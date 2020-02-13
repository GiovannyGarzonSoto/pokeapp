
import app from './app'
import {databaseConnection} from './database'

export const main = () => {
    app.listen(app.get('port'))
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`)
    databaseConnection()
}

main()