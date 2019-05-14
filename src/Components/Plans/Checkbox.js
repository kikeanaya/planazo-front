import React from "react"

const Checkbox = ({ label, isSelected, onCheckboxChange }) => (
  <div className="checkbox-item">
      <input
        type="checkbox"
        id={label}
        name={label}
        checked={isSelected}
        onChange={onCheckboxChange}
        className="form-check-input"
      />
      <label for={label}>{label}</label>
  </div>
)

export default Checkbox