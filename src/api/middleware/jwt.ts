import { Request, Response, NextFunction } from 'express'
import { User } from '../../models/user'
import { JWT_SECRET_KEY } from '../../config/constants'
import { sign, verify as jwtVerify, decode as jwtDecode, JsonWebTokenError } from 'jsonwebtoken'

export function jwtCheck (role?: Array<string>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const bearer = req.get('Authorization') as string

    if (!bearer) {
      return next(new JsonWebTokenError('no found token'))
    }

    if (!bearer.match(/^Bearer [A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)) {
      return next(new JsonWebTokenError('jwt must be provided'))
    }

    const token = bearer.split(' ')[1]
    verify(token)
    const decodedToken = decode(token)
    res.locals.decodeToken = decodedToken

    if (role && role.indexOf(decodedToken.role) === -1) {
      return next(new JsonWebTokenError('permission enough'))
    }

    next()
  }
}

export function encode (user: User): string {
  return sign({
    _key: user._key,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + (3600)
  }, JWT_SECRET_KEY)
}

function verify (token: string): string | object {
  return jwtVerify(token, JWT_SECRET_KEY)
}

export function decode (token: string): any {
  return jwtDecode(token)
}
