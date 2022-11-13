interface ICommentUser {
  name: string;
  photo: string;
}

export interface IComment {
  user: ICommentUser;
  text: string;
  date: string;
}
