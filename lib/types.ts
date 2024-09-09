export type Item = {
    id: number;
    name: string;
    stat: string;
    value: number;
  };

export type Hero = {
    name: string;
    image: string;
  };

export type Heroes = {
    [key: string]: Hero;
  };
