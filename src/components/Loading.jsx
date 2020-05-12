import React from "react";

export default function Loading({ isLoading }) {
  return isLoading ? (
    <div className="text-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : (
    <> </>
  );
}
