import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import Users from '../models/Users'

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: process.env.TOKEN_SEED
}, async (payload, done) => {
    try{
        const user = await Users.findById(payload.sub)
        if(!user){
            return done(null, false)
        }
        done(null, user)
    } catch(err){
        done(err, false)
    }
}))