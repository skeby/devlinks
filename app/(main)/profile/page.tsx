"use client";

import { useTokens } from "@/app/context/tokens";

const Profile = () => {
  const tokens = useTokens();
  return <div>Email: {tokens?.decodedToken.email}</div>;
};

export default Profile;
