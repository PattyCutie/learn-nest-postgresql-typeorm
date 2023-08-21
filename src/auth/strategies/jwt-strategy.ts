import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

//give a strategy a name when use more than stratefy from the same package
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.jwt_secret}`,
    });
  }

  async validate(payload: any) {
    return { user: payload.sub, username: payload.username };
  }
}
