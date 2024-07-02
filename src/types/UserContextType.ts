import { JwtPayload } from "jsonwebtoken";

export interface UserContextType {
    user: JwtPayload | null;
    setUser: React.Dispatch<React.SetStateAction<JwtPayload | null>>;
}