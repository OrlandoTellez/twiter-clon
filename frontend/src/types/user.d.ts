export interface User {
  id: number;
  name: string;
  last_name: string;
  age: number;
  email: string;
  username: string;
  bio?: string;
  image_profile?: string;
  image_banner?: string;
  created_at?: string;
}

export interface UpdateUser {
  name?: string;
  last_name?: string;
  age?: number;
  email?: string;
  bio?: string;
  image_profile?: File;
  image_banner?: File;
}
