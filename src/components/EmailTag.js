import React from "react";

function EmailTag({ tags, limit }) {
  const newLimit = limit ? limit : tags.length;
  return (
    <>
      {tags.slice(0, newLimit).map((tag, index) => (
        <React.Fragment key={index}>
          {index + 1 <= newLimit && (
            <span
              className="text-blue border border-blue bg-blue-light rounded p-1 text-sm inline-block"
              key={index}
            >
              {tag}
            </span>
          )}
        </React.Fragment>
      ))}
      {tags.length > newLimit && (
        <span className="text-blue border border-blue bg-blue-light rounded p-1 text-sm inline-block">
          {tags.length - newLimit + "+"}
        </span>
      )}
    </>
  );
}

export default EmailTag;
