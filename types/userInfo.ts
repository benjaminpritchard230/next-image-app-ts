export interface IUserInfo {
  id: number;
  followers: number[];
  followers_names: string[];
  following: number[];
  following_names: string[];
  last_login: string;
  username: string;
  is_active: boolean;
  date_joined: string;
  profile_image: string;
  about_me: any;
  location: any;
}
