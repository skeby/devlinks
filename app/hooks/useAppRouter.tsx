import { useRouter } from "next/navigation";
import * as NProgress from "nprogress";

const useAppRouter = () => {
  const router = useRouter();
  const { push } = router;
  router.push = (href, options) => {
    NProgress.start();
    push(href, options);
  };

  return router;
};

export default useAppRouter;
