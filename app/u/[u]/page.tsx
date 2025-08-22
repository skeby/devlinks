import ProfileNavbar from "@/app/components/layout/profile-navbar";
import { Params } from "../../types";
import { LinkFields } from "@/app/(main)/page";
import MobileSimLink from "@/app/components/shared/mobile-sim/mobile-sim-link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import { Avatar, message } from "antd";

const UserProfilePage = async ({ params }: { params: Promise<Params> }) => {
  const u = (await params)?.u;

  // Fetch user doc from Firestore
  const docRef = doc(db, "users", u as string);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return <p className="text-center">User not found</p>;
  }

  const userData = snapshot.data() as {
    firstName: string;
    lastName: string;
    email: string;
    profilePicture?: string;
    links: LinkFields["fields"];
  };

  return (
    <main className="relative mx-auto flex h-full min-h-screen w-full max-w-[1440px] flex-col bg-grey-light pb-20">
      <ProfileNavbar u={u as string} />
      <div className="absolute inset-0 h-[350px] w-full rounded-b-[32px] bg-primary"></div>
      <div className="relative z-10 mx-auto mt-[82px] w-[350px] space-y-14 rounded-3xl bg-white px-14 py-12 shadow-[0px_0px_32px_0px_#0000001A]">
        <div className="flex flex-col items-center gap-y-[25px] text-center">
          <Avatar
            alt="User profile"
            shape="circle"
            size={104}
            src={userData.profilePicture}
            className="!border-4 !border-primary !text-3xl !font-bold !text-primary"
          >
            {userData.firstName?.[0]}
            {userData.lastName?.[0]}
          </Avatar>
          <div className="space-y-2">
            <h1 className="heading-m leading-10 text-grey-dark">
              {userData.firstName} {userData.lastName}
            </h1>
            <h2 className="body-m text-grey">{userData.email}</h2>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          {userData.links.map((l, index) => (
            <MobileSimLink key={index} href={l.link} platform={l.platform} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default UserProfilePage;
