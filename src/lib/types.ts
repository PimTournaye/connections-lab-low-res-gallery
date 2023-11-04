export type ProjectInfo = {
  title: string,
  author: string,
  description: string,
  image: string,
  link?: string
} | null;

export type Player = {
  id: string,
  username: string,
  color: string,
  x: number,
  y: number,
  room?: string,
};