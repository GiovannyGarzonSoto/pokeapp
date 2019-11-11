import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'
import Users from '../models/User'
import jwt from 'jsonwebtoken'

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async(id, done) => {
    await User.findById(id)
    done(null, user )
})

passport.use('local-signup', new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, name, password, done) => {
    const user = await User.findOne({email: email})
    if(user) {
        return done(null, false, req.flash('signupMessage', 'El email ya existe'))
    }else{
        const newUser = new Users({
            name,
            email: req.body.email,
            password: newUser.encryptPassword(password),
            google: req.body.google
        })
        await newUser.save()
        done(null, newUser)
    }
}))

passport.use('local-signin', new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, name, password, done) => {
    const user = await User.findOne({name})
    if(!user) {
        return done(null, false, req.flash('signinMessage', 'El nombre de Usuario no existe'))
    }
    if(!user.comparePassword(password)){
        return done(null, false, req.flash('signinMessage','Contraseña erronea'))
    }
    done(null, user)
}))