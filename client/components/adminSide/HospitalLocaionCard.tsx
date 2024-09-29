import { Card, CardContent, CardHeader } from "../ui/card";

interface Prop {
  name: string;
  city: string;
}

const HospitalLocationCard = ({ name, city }: Prop) => {
  return (
    <Card className="w-40">
      <CardHeader>
        <p className="text-xl font-semibold">{name}</p>
      </CardHeader>
      <CardContent>
        <p className="text-center">{city}</p>
      </CardContent>
    </Card>
  );
};

export default HospitalLocationCard;
