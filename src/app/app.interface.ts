export interface IUser {
  avatar_url: string;
  name: string;
  login: string;
  bio?: string;
  html_url: string;
  blog?: string;
  company?: string;
  location?: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface IFollowing {
  avatar_url: string;
  name: string;
  login: string;
}
