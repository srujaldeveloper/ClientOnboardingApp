import React from "react";

export default function SubHeader({ title, description }) {
  return (
    <div className="card mb-4">
      <div className="card-header">{title}</div>
      <div className="card-body">
        <p className="card-text text-muted">{description}</p>
      </div>
    </div>
  );
}
