import Nav from "@/components/userSide/nav";

interface Prop {
  children: React.ReactNode;
}

const UserPageLayout = ({ children }: Prop) => {
  return (
    <div>
      <Nav />
      <div className="mt-5 p-5">{children}</div>
    </div>
  );
};
export default UserPageLayout;
