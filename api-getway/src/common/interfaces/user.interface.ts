import { Document } from 'mongoose';
export interface UserInterface extends Document {
  name: string;
  userName: string;
  email: string;
  password: string;
}
