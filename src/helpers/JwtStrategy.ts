import passport from 'passport';
import passportJwt from 'passport-jwt';

const strategy = passportJwt.Strategy;
const extractJWT = passportJwt.ExtractJwt;

class JwtStrategy {

    verifyJwt() {
        passport.use(new strategy({
            secretOrKey: process.env.SECRET_JWT,
            jwtFromRequest: extractJWT.fromHeader('x-token')
        }, (token, done) => {
            try {
                return done(null, token);
            } catch(error) {
                done(error);
            }
        }))
    }
}

export default new JwtStrategy();