import useSelector from "./useSelector";
import HelperManager from "../helper/HelperManager";

const useAuth = () => {
  const { token } = useSelector((state) => state.auth);
  return {
    userId: HelperManager.getUserId(token?.access_token ?? ""),
    ...token,
  };
};

export default useAuth;
