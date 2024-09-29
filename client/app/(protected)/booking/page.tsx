import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Booking = () => {
  return (
    <div>
      <div className="w-full h-96 flex justify-center ">
        <Card className="w-full lg:w-[620px]">
          <CardHeader>
            <p className="text-3xl font-bold text-center">Your Booking List</p>
          </CardHeader>
          <CardContent className="h-full">
            <div className="w-full h-full flex justify-center items-center">
              <p> You Dont't have any booking right now</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Booking;
