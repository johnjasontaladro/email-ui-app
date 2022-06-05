import { useDispatch, useSelector } from "react-redux";
import MainHeader from "./components/MainHeader";
import SavedSection from "./components/SavedSection";
import UnRead from "./components/UnRead";
import { getEmailData } from "./reducers/email";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Loader from "./components/Loader";

function App() {
  const dispatch = useDispatch();
  const emailStatus = useSelector((state) => state.email.status);

  useEffect(() => {
    dispatch(getEmailData());
  }, [dispatch]);

  return (
    <div className="p-4 text-sm">
      {emailStatus === "pending" && <Loader />}
      {emailStatus !== "pending" && (
        <>
          <MainHeader />
          <UnRead />
          <SavedSection />
        </>
      )}
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;
