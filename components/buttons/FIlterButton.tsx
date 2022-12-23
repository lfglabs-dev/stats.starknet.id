import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { FC } from "react";
import style from "../../styles/FilterButton.module.css";

export enum Temporality {
  WEEK = 'Week',
  MONTH = 'Month',
  YEAR = 'Year',
}

interface FilterButtonProps {
  value: Temporality;
  possibleValues: Temporality[];
  onChange: (value: Temporality) => void;
}

export const FilterButton: FC<FilterButtonProps> = ({ value, possibleValues, onChange }) => {
  return (
    <ToggleButtonGroup
      color="primary"
      value={value}
      exclusive
      onChange={(_, value) => onChange(value as Temporality)}
      aria-label="Temporality"
      className={style.toggleButtonGroup}
    >
      {possibleValues.map((value) => (
        <ToggleButton className={style.toggleButton} key={value} value={value}>{value}</ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}