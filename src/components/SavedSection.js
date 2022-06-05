import { useSelector } from "react-redux";
import EmailBox from "./EmailBox";
import EmailBoxEmpty from "./EmailBoxEmpty";

function SavedSection() {
  const emailData = useSelector((state) => state.email.value);
  const savedCount = emailData.saved.length;

  return (
    <div className="section-saved mt-6">
      <div className="flex justify-between mb-4">
        <div>
          <h3 className="text-gray">Recently Saved</h3>
        </div>
        <div>
          <span className="bg-gray p-0 rounded-full inline-block leading-8 text-center h-8 w-8 text-white">
            {savedCount}
          </span>
        </div>
      </div>
      {emailData.saved.length === 0 && <EmailBoxEmpty />}
      {emailData.saved.map((email, index) => (
        <EmailBox email={email} status="saved" key={index} />
      ))}
    </div>
  );
}

export default SavedSection;
