import { useSession } from "next-auth/react";

const useSessionWithUpdate = () => {
  const { data: session, update, status } = useSession();
  return { session, update, status };
}
export { useSessionWithUpdate}