import React from "react";

export default function Boxx() {
  return (
    <>
      <div
        style={{ width: isOpen ? "300px" : "50px" }}
        className="bg-gray "
        tabindex="-1"
        aria-labelledby="drawer-label"
      >
        <h1>This is Drawer</h1>
      </div>
    </>
  );
}
