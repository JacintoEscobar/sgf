import "./mes-select.css";

const MesSelect = () => {
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

  return (
    <select title="mes-select" className="form-select" defaultValue="">
      <option key={0} value="">
        -- SELECCIONAR --
      </option>
      {meses.map((mes: string, index: number) => (
        <option key={index} value={mes}>
          {mes}
        </option>
      ))}
    </select>
  );
};

export default MesSelect;
