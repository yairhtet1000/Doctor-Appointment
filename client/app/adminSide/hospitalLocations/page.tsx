import HospitalLocationCard from "@/components/adminSide/HospitalLocaionCard";
import AddNewHospitalLocation from "@/components/adminSide/addNewHospitalLocation";
import Link from "next/link";

const hospitalLocations = () => {
  const hospitals = [
    { id: 1, name: "Ho Ho", address: "33st/32st", city: "Mandalay" },
  ];
  return (
    <div>
      <div className="flex justify-end">
        <AddNewHospitalLocation />
      </div>
      <div className="flex flex-wrap">
        {hospitals.map((item) => {
          return (
            <Link href={`/adminSide/hospitalLocations/${item.id}`}>
              <HospitalLocationCard
                name={item.name}
                city={item.city}
                key={item.id}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default hospitalLocations;
