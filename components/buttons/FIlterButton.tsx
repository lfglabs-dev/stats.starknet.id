import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { FC } from "react";
import style from "../../styles/FilterButton.module.css";
import { Period } from "../../types/metrics";


interface FilterButtonProps {
  value: Period;
  possibleValues: Period[];
  onChange: (value: Period) => void;
}

export const FilterButton: FC<FilterButtonProps> = ({ value, possibleValues, onChange }) => {
  return (
    <ToggleButtonGroup
      color="primary"
      value={value}
      exclusive
      onChange={(_, value) => onChange(value as Period)}
      aria-label="Period"
      className={style.toggleButtonGroup}
    >
      {possibleValues.map((value) => (
        <ToggleButton className={style.toggleButton} key={value} value={value}>{value}</ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}