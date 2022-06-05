import React from "react";

function EmailBoxEmpty() {
  return (
    <div className="email-box border-2 bg-gray-light border-gray-light min-h-fit rounded-lg mb-4">
      <div className="email-header p-4 ">
        <h6>No record found.</h6>
      </div>
    </div>
  );
}

export default EmailBoxEmpty;
