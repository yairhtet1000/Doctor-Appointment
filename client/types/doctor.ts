export interface Doctor {
  id: string;
  name: string;
  phone: string;
  skill: string;
  experience: string;
  description: string;
  hospitalLocation: string;
  image: string;
}

export interface newDoctor {
  name: string;
  phone: string;
  skill: string;
  experience: string;
  description: string;
  hospitalLocation: string;
  image: string;
  timeTable: [];
}
