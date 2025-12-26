import ProfileNavbar from "@/app/components/layout/profile-navbar";
import { Params } from "../../types";
import { LinkFields } from "@/app/(main)/page";
import MobileSimLink from "@/app/components/shared/mobile-sim/mobile-sim-link";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/app/firebase";
import { Avatar } from "antd";
import Logo from "@/app/components/shared/logo";
import { Metadata } from "next";

/**
 * Helper to fetch user data for both Metadata and the Page
 */
async function getUser(u: string) {
  if (!u) return null;

  // 1. Try username
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("username", "==", u.toLowerCase()), limit(1));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    return {
      userData: userDoc.data() as UserData,
      userId: userDoc.id,
    };
  }

  // 2. Fallback to UID
  const docRef = doc(db, "users", u);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      userData: docSnap.data() as UserData,
      userId: docSnap.id,
    };
  }

  return null;
}

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string;
  links: LinkFields["fields"];
};

/**
 * GENERATE METADATA
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const u = (await params)?.u;
  const result = await getUser(u);

  if (!result) {
    return {
      title: "Profile Not Found",
    };
  }

  const { userData } = result;
  const fullName = `${userData.firstName} ${userData.lastName}`;
  // Use your production domain (absolute URL is required)
  const domain =
    process.env.NEXT_PUBLIC_DOMAIN || "https://devlinks-skeby.vercel.app";

  // Encode the Firebase URL so it can be passed as a query param
  const ogImageUrl = userData.profilePicture
    ? `${domain}/api/og-image?url=${encodeURIComponent(userData.profilePicture)}`
    : `${domain}/icons/default-og.png`; // Fallback image in your public folder

  return {
    title: `${fullName} | DevLinks`,
    description: `Check out the links of ${fullName}`,
    openGraph: {
      title: `${fullName} - Profile Links`,
      description: `View ${fullName}'s professional links on DevLinks.`,
      images: [
        {
          url: ogImageUrl,
          width: 600,
          height: 600, // Explicitly tell crawlers it's a square
          alt: `${fullName}'s Profile Picture`,
        },
      ],
      type: "profile",
      url: `https://devlinks-skeby.vercel.app/u/${u}`,
      siteName: "DevLinks",
    },
    twitter: {
      card: "summary",
      title: `${fullName} | DevLinks`,
      description: `View ${fullName}'s professional links on DevLinks.`,
      images: [ogImageUrl],
    },
  };
}

/**
 * PAGE COMPONENT
 */
const UserProfilePage = async ({ params }: { params: Promise<Params> }) => {
  const u = (await params)?.u;
  const result = await getUser(u);

  // 3. If neither found, return 404
  if (!result) {
    return (
      <div className="flex h-screen items-center justify-center gap-2.5 p-5">
        <Logo textClassName="hidden" />
        <p className="heading-m text-grey-dark">Profile not found</p>
      </div>
    );
  }

  const { userData: finalUserData } = result;

  return (
    <main className="relative mx-auto flex h-full min-h-screen w-full max-w-[1440px] flex-col bg-white pb-10 sm:bg-grey-light">
      <ProfileNavbar u={u} />

      <div className="fixed inset-0 hidden h-[357px] w-full rounded-b-[32px] bg-primary sm:block"></div>

      <div className="z-10 mx-auto mt-[60px] w-full max-w-[350px] space-y-14 rounded-3xl bg-white px-10 shadow-none min-[400px]:px-14 sm:mt-[102px] sm:py-12 sm:shadow-[0px_0px_32px_0px_#0000001A] lg:mt-[82px]">
        <div className="flex flex-col items-center gap-y-[25px] text-center">
          <Avatar
            alt="User profile"
            shape="circle"
            size={104}
            src={finalUserData.profilePicture}
            className="!border-4 !border-primary !text-3xl !font-bold !text-primary"
          >
            {finalUserData.firstName?.[0]}
            {finalUserData.lastName?.[0]}
          </Avatar>
          <div className="space-y-2">
            <h1 className="heading-m leading-10 text-grey-dark">
              {finalUserData.firstName} {finalUserData.lastName}
            </h1>
            <h2 className="body-m text-grey">{finalUserData.email}</h2>
          </div>
        </div>

        <div className="flex flex-col gap-y-4">
          {finalUserData.links.map((l, index) => (
            <MobileSimLink key={index} href={l.link} platform={l.platform} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default UserProfilePage;
