import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/entity/user.enity";

@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'your_jwt_secret', 
            // ignoreExpiration: false,
        });
    }


    async validate(payload: any) {
        const user = await this.usersRepository.findOne({ where: {id: payload.sub} });
        if (!user) {
            throw new UnauthorizedException();
        }
        return {
            id: user.id,
            email: user.email,
            name: user.name,
        }
    } 


}