import React, { useReducer } from "react";
import "./confirmation.css";

export default function Confirmation({ confirm }) {
  return (
    <div className="confirm-back">
      <div className="confirm">
        <p>Are you sure?</p>

        <button className="confirm-no">Cancel</button>
        <button className="confirm-yes">Confirm</button>
      </div>
    </div>
  );
}

const initialConfirm = {
  visible: false,
  no: false,
  yes: false,
};
const reducerConfirm = (state, action) => {
  switch (action.type) {
    case "show":
      return {
        visible: true,
        no: false,
        yes: false,
      };
    case "hide":
      return initialConfirm;
    case "yes":
      return {
        visible: false,
        no: false,
        yes: true,
      };
    case "no":
      return {
        visible: false,
        no: true,
        yes: false,
      };
    default:
      return state;
  }
};

export function useConfirm() {
  return useReducer(reducerConfirm, initialConfirm);
}
