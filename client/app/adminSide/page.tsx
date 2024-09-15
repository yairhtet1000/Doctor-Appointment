import AdminDetailCards from "@/components/adminSide/adminDetailCards";
import { Chart } from "@/components/adminSide/chart";
import { Button } from "@/components/ui/button";
import { ChartConfig } from "@/components/ui/chart";
import { NotebookText, ScrollText, Stethoscope, Users } from "lucide-react";

const DashBoard = () => {
  const dashBoardDetails = [
    { id: 1, header: "Patients", number: 1, icon: <Users /> },
    { id: 2, header: "Doctors", number: 1, icon: <Stethoscope /> },
    { id: 3, header: "Bookings", number: 1, icon: <NotebookText /> },
    { id: 4, header: "Appoitments", number: 1, icon: <ScrollText /> },
  ];
  const chartData = [
    { month: "January", earning: 186 },
    { month: "February", earning: 305 },
    { month: "March", earning: 237 },
    { month: "April", earning: 73 },
    { month: "May", earning: 209 },
    { month: "June", earning: 214 },
    { month: "July", earning: 214 },
    { month: "August", earning: 214 },
    { month: "September", earning: 214 },
    { month: "October", earning: 214 },
    { month: "November", earning: 214 },
    { month: "December", earning: 214 },
  ];

  const chartConfig = {
    earning: {
      label: "Total Earning",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">DashBoard</h1>
      </div>
      <div
        className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 "
        x-chunk="dashboard-02-chunk-1"
      >
        {dashBoardDetails.map((item) => {
          return (
            <AdminDetailCards
              header={item.header}
              count={item.number}
              icon={item.icon}
            />
          );
        })}
      </div>
      <div>
        <Chart
          chartHeader="Total Earning"
          chartDiscription="January From December"
          chartData={chartData}
          chartConfig={chartConfig}
          dataKeyY="earning"
          dataKeyX="month"
          strokeColor="hsl(var(--chart-1))"
        />
      </div>
    </>
  );
};
export default DashBoard;
