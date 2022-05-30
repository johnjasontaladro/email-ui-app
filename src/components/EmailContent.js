import util from "../utils/util";
import EmailTag from "./EmailTag";

function EmailContent({ email }) {
  const date = util.getDateWithTime(email.Date);

  return (
    <div className="email-content py-4 mx-4 border-t border-gray-light hidden">
      <div className="flex justify-between space-x-2 mb-4">
        <div className="flex-none">
          <span className="block">From: {email.Sender}</span>
          <span className="block">Date: {date}</span>
          <span className="block">Subject: {email.Subject}</span>
          <span className="block">To: {email.Receiver}</span>
        </div>
        <div className="flex-2 space-x-2">
          <EmailTag tags={email.Tags} />
        </div>
      </div>
      <div className="flex mb-4" data-cy="content">
        {email.Content}
      </div>
    </div>
  );
}

export default EmailContent;
