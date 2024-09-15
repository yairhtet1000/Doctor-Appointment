import { Card, CardContent, CardHeader } from "../ui/card";

interface Prop {
  header: string;
  count: number;
  icon: any;
}

const AdminDetailCards = ({ header, count, icon }: Prop) => {
  return (
    <Card>
      <CardHeader className="text-xl font-semibold">{header}</CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <p className="text-lg">{count}</p>
          <p className="">{icon}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminDetailCards;
