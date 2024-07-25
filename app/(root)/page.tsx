"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import nProgress from "nprogress";

const RootPage = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    nProgress.done();
  }, [pathname, searchParams]);
  return <div>RootPage</div>;
};

export default RootPage;
