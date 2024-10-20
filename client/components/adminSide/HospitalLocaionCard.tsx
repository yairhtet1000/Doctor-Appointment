import { Card, CardContent, CardHeader } from "../ui/card";

interface Prop {
  address: string;
  city: string;
}

const HospitalLocationCard = ({ address, city }: Prop) => {
  return (
    <Card className="w-40 h-44 flex flex-col justify-around items-center">
      <CardHeader>
        <p className="text-xl font-semibold">{city}</p>
      </CardHeader>
      <CardContent>
        <p className="text-center">{address}</p>
      </CardContent>
    </Card>
  );
};

export default HospitalLocationCard;
