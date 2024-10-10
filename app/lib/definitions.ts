import { JwtPayload } from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
  email: string;
}