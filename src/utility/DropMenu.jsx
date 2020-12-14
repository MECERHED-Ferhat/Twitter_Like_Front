import React, { useEffect, useState, useRef } from "react";

export default function DropMenu({ button, menu }) {
  const menuContainer = useRef(null);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickDocument);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickDocument);
    };
  }, [isOpen]);

  const handleClickDocument = (event) => {
    if (menuContainer.current && !menuContainer.current.contains(event.target))
      setOpen(false);
  };

  const handleClickMenu = (event) => {
    setOpen((prevState) => !prevState);
  };

  return (
    <div style={menuStyle} ref={menuContainer}>
      <div onClick={handleClickMenu}>{button()}</div>
      {isOpen && menu()}
    </div>
  );
}

const menuStyle = {
  display: "inline-block",
  position: "relative",
};
