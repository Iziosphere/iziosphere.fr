import {ERole} from './user.model';

export interface JwtTokenDto {
  token: string;

}

export interface JwtPayload {
  id: number;
  email: string;
  role: ERole;
}

export interface RegisterDto {
  message: string;
}


