import { useDispatch } from "react-redux";
import MainHeader from "./components/MainHeader";
import SavedSection from "./components/SavedSection";
import UnRead from "./components/UnRead";
import { setData } from "./reducers/email";
import emailData from "./data/email-data";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  dispatch(setData(emailData));

  return (
    <div className="p-4 text-sm">
      <MainHeader />
      <UnRead />
      <SavedSection />
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;
