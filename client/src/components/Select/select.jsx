import Select from "react-select";
import "./select.css";

export default function SelectArray({ setSelectedOption, optionsName }) {
  const options =
    optionsName === "activity_level"
      ? [
          { value: "niedrig", label: "Niedrig" },
          { value: "mittel", label: "Mittel" },
          { value: "hoch", label: "Hoch" },
        ]
      : optionsName === "gender"
      ? [
          { value: "männlich", label: "Männlich" },
          { value: "weiblich", label: "Weiblich" },
          { value: "divers", label: "Divers" },
        ]
      : optionsName === "unit"
      ? [
          { value: "g", label: "g" },
          { value: "kg", label: "kg" },
          { value: "ml", label: "ml" },
          { value: "l", label: "l" },
          { value: "stk", label: "Stück" },
        ]
      : [];

  const handleChange = (option) => {
    setSelectedOption(option);
    console.log("Selected option:", option);
  };

  return (
    <div style={{ textAlign: "left" }}>
      <Select
        className="recipeform-select-field"
        classNamePrefix="select"
        options={options}
        onChange={handleChange}
        placeholder="Bitte auswählen"
        isClearable
      />
    </div>
  );
}
