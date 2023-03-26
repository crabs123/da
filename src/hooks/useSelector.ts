import { TRootState } from "@src/globalState/ReduxManager";
import { createSelectorHook } from "react-redux";

const useSelector = createSelectorHook<TRootState>();
export default useSelector;
