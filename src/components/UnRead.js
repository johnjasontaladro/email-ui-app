import { useSelector } from "react-redux";
import EmailBox from "./EmailBox";
import EmailBoxEmpty from "./EmailBoxEmpty";

function UnRead() {
  const emailData = useSelector((state) => state.email.value);
  const unReadCount = emailData.unRead.length;

  return (
    <div className="section-unread mt-6">
      <div className="flex justify-between mb-4">
        <div>
          <h3 className="text-gray">Unread</h3>
        </div>
        <div>
          <span className="bg-gray p-0 rounded-full inline-block leading-8 text-center h-8 w-8 text-white">
            {unReadCount}
          </span>
        </div>
      </div>
      {emailData.unReadCurrentItems.length === 0 && <EmailBoxEmpty />}
      {emailData.unReadCurrentItems.map((email, index) => (
        <EmailBox email={email} status="unread" key={index} />
      ))}
    </div>
  );
}

export default UnRead;
