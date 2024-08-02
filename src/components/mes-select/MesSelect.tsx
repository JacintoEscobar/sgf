import { MesSelectProps } from "../../util/interfaces";
import "./mes-select.css";

const MesSelect = ({ setControlMes }: MesSelectProps) => {
  const meses = [
    "ENERO",
    "FEBRERO",
    "MARZO",
    "ABRIL",
    "MAYO",
    "JUNIO",
    "JULIO",
    "AGOSTO",
    "SEPTIEMBRE",
    "OCTUBRE",
    "NOVIEMBRE",
    "DICIEMBRE",
  ];

  const controlarMes = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setControlMes(Number.parseInt(event.target.value));

  return (
    <select
      title="mes-select"
      className="form-select"
      defaultValue={new Date().getMonth() + 1}
      onChange={controlarMes}
    >
      {meses.map((mes: string, index: number) => (
        <option key={index} value={index + 1}>
          {mes}
        </option>
      ))}
    </select>
  );
};

export default MesSelect;
