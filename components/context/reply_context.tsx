import React, {
  useContext,
  useState,
  FC,
  ReactNode,
  useEffect,
  Suspense,
  lazy,
} from "react";
const SnackbarComponent = lazy(() => import("../elements/snackbar"));

export type replyType = string | null;
export interface ReplyContextType {
  reply: replyType;
  setReply: React.Dispatch<React.SetStateAction<replyType>>;
}
export const ReplyContext = React.createContext<ReplyContextType>({
  reply: null,
  setReply: () => {},
});

interface Props {
  children: ReactNode;
}

const ReplyHolder: FC<Props> = ({ children }) => {
  const [reply, setReply] = useState<replyType>("hello");

  useEffect(() => {
    if (reply) {
      const timeoutId = setTimeout(() => {
        setReply(null);
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [reply]);

  return (
    <ReplyContext.Provider value={{ reply, setReply }}>
      <Suspense fallback={null}>
        <SnackbarComponent />
      </Suspense>

      {children}
    </ReplyContext.Provider>
  );
};

export const useReplyContext = () => useContext(ReplyContext);
export default ReplyHolder;
