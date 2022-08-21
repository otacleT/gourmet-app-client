import { useContractFunction } from "@usedapp/core";
import { contract } from "..";

export const useEvaluate = () => {
  const { state, send } = useContractFunction(contract, "Evaluate", {
    transactionName: "Add",
  });
  const loading =
    state.status === "PendingSignature" || state.status === "Mining";
  const success = state.status === "Success";
  const error = state.status === "Fail" || state.status === "Exception";
  return {
    loading,
    success,
    error,
    send,
  };
};
