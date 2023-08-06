import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import style from "../../styles/FilterButton.module.css";

interface FilterButtonProps<T> {
  value: T;
  possibleValues: T[];
  onChange: (value: T) => void;
}

export function FilterButton<T>({
  value,
  possibleValues,
  onChange,
}: FilterButtonProps<T>) {
  return (
    <ToggleButtonGroup
      color="primary"
      value={value}
      exclusive
      onChange={(_, value) => onChange(value as T)}
      aria-label="Period"
      className={style.toggleButtonGroup}
    >
      {possibleValues.map((value) => (
        <ToggleButton
          className={style.toggleButton}
          key={value as string}
          value={value as string}
        >
          {value as string}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
