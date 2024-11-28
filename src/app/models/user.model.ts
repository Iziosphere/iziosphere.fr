
export interface UserCreateDto{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserLoginDto{
  email: string;
  password: string;
}

export interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string;
  bio?: string;
  location?: string;
  website?: string;
  role: RoleDto;
}

export interface UserDtoList{
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role?: RoleDto;
}


export interface RoleDto {
  name: ERole;
}

export enum ERole {
  ROLE_USER = "ROLE_USER",
  ROLE_ADMIN = "ROLE_ADMIN",
}
