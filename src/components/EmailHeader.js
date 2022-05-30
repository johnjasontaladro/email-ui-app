import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import util from "../utils/util";
import EmailTag from "./EmailTag";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setCheckedData,
  removeCheckedData,
  setCheckedSaveData,
  removeCheckedSaveData,
} from "../reducers/email";

function EmailHeader({ email, status }) {
  const [isOpen, setIsOpen] = useState(false);

  const getDay = util.getDayOfDate(email.Date);
  const getMonth = util.getShortMonthOfDate(email.Date);
  const initials = util.getNameInitial(email.Sender);
  const date = util.getDateWithTime(email.Date);
  const dateFromNow = util.getDateFromNow(email.Date);

  const dispatch = useDispatch();

  const handleClick = (e) => {
    let parentElem;

    if (e.target.tagName.toLowerCase() === "input") {
      return;
    }

    if (e.target.classList.contains("email-box")) {
      parentElem = e.target;
    } else {
      parentElem = e.target.closest(".email-box");
    }

    const content = parentElem.querySelector(".email-content");

    if (content.classList.contains("hidden")) {
      content.classList.remove("hidden");
      setIsOpen(true);
    } else {
      content.classList.add("hidden");
      setIsOpen(false);
    }
  };

  const handleCheckbox = (e, email) => {
    if (status === "unread") {
      if (e.target.checked) {
        dispatch(setCheckedData(email));
      } else {
        dispatch(removeCheckedData(email));
      }
    } else {
      if (e.target.checked) {
        dispatch(setCheckedSaveData(email));
      } else {
        dispatch(removeCheckedSaveData(email));
      }
    }
  };

  return (
    <div
      className="email-header p-4 flex flex-row flex-wrap items-center space-x-4 cursor-pointer hover:bg-gray-light"
      onClick={handleClick}
    >
      <div className="flex-none">
        <DragIndicatorIcon />
      </div>
      <div className="flex-none">
        <input
          type="checkbox"
          className="align-middle h-5 w-5"
          onChange={(e) => handleCheckbox(e, email)}
        />
      </div>
      <div className="flex-none">
        <span
          className={`status rounded-full h-4 w-4 leading-4 inline-block ${
            status === "unread" ? "bg-green" : "bg-red"
          }`}
        >
          &nbsp;
        </span>
      </div>
      <div className="flex-none">
        <div className="rounded border border-gray bg-gray-light w-10 align-middle text-center">
          <span className="block" data-cy="headerDay">
            {getDay}
          </span>
          <span className="block text-xs uppercase" data-cy="headerMonth">
            {getMonth}
          </span>
        </div>
      </div>
      <div className="flex-none">
        <div className="rounded-full bg-gray align-middle text-center text-white w-8 h-8 leading-8">
          <span data-cy="initials">{initials}</span>
        </div>
      </div>
      <div className="flex-1">
        <div data-cy="subject">
          <div className="font-bold">{email.Subject}</div>
          <div className="text-sm text-gray">
            {email.Sender} | {date}
          </div>
        </div>
      </div>
      <div className="self-auto">
        <div className={`space-x-2 ${isOpen ? "hidden" : ""}`}>
          <EmailTag tags={email.Tags} limit={2} />
        </div>
      </div>
      <div className="flex-none">
        <div className="text-yellow bg-gray-light p-1 rounded text-sm">
          <AccessTimeIcon fontSize="small" />{" "}
          <span data-cy="dateFromNow">{dateFromNow}</span>.
        </div>
      </div>
      <div className="flex-none">
        <div>
          {isOpen ? (
            <KeyboardArrowDownIcon
              fontSize="small"
              className="fontSizeSmall text-xs"
            />
          ) : (
            <KeyboardArrowRightIcon
              fontSize="small"
              className="fontSizeSmall text-xs"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default EmailHeader;
