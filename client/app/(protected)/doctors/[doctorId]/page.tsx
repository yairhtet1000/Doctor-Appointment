import Image from "next/image";
import Test from "../../../../public/doctor.png";
const doctorDetailsPage = () => {
  return (
    <div className="flex">
      <Image src={Test} alt="" width={200} />
      <div>
        <p className="text-6xl">His Details</p>
      </div>
    </div>
  );
};

export default doctorDetailsPage;
