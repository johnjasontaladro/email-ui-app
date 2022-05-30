import EmailContent from "./EmailContent";
import EmailHeader from "./EmailHeader";

function EmailBox({ email, status }) {
  return (
    <div className="email-box border-2 border-gray-light min-h-fit rounded-lg mb-4">
      <EmailHeader email={email} status={status} />
      <EmailContent email={email} status={status} />
    </div>
  );
}

export default EmailBox;
