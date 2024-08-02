import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { AgregarMovimientoProps, Movimiento } from "../../../util/interfaces";
import { MensajesError, TiposMovimientos } from "../../../util/enums";
import { mostrarMensajeError } from "../../../util/functions";
import { v4 as uuidv4 } from "uuid";
import {
  conceptoOtro,
  conceptosEgresos,
  conceptosIngresos,
} from "../../../util/constant";
import "./agregar-movimiento.css";

const AgregarMovimientoModal = ({
  mostrarModal,
  cerrarModalAgregarMovimiento,
  tipoNuevoMovimiento,
}: AgregarMovimientoProps) => {
  const [nuevoMovimiento, setNuevoMovimiento] = useState<Movimiento>(
    new Movimiento()
  );

  const [controlConcepto, setControlConcepto] = useState("");

  const validarNuevoMovimiento = () => {
    return (
      nuevoMovimiento.concepto !== "" &&
      nuevoMovimiento.descripcion !== "" &&
      nuevoMovimiento.fecha !== "" &&
      nuevoMovimiento.monto !== 0
    );
  };

  const guardarNuevoMovimiento = (guardar: boolean = true): void => {
    if (guardar) {
      if (!validarNuevoMovimiento()) {
        return mostrarMensajeError(MensajesError.INFORMACION_INVALIDA);
      }
      nuevoMovimiento.id = uuidv4();
      nuevoMovimiento.tipo = tipoNuevoMovimiento;
      nuevoMovimiento.tipo === TiposMovimientos.EGRESO
        ? (nuevoMovimiento.monto *= -1)
        : nuevoMovimiento.monto;
      cerrarModalAgregarMovimiento(nuevoMovimiento);
      return;
    }
    setNuevoMovimiento(new Movimiento());
    cerrarModalAgregarMovimiento(nuevoMovimiento, guardar);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const valor = name === "monto" ? Number.parseFloat(value) : value;
    setNuevoMovimiento((nuevoMovimiento) => ({
      ...nuevoMovimiento,
      [name]: valor,
    }));
  };

  const controlarConcepto = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setControlConcepto(event.target.value);

  useEffect(() => {
    if (controlConcepto !== conceptoOtro) {
      nuevoMovimiento.concepto = controlConcepto;
      setNuevoMovimiento(nuevoMovimiento);
    }
  }, [controlConcepto]);

  useEffect(() => {
    nuevoMovimiento.tipo = tipoNuevoMovimiento;
    nuevoMovimiento.concepto =
      tipoNuevoMovimiento === TiposMovimientos.INGRESO
        ? conceptosIngresos[0]
        : conceptosEgresos[0];
    setNuevoMovimiento(nuevoMovimiento);
  }, []);

  return (
    <Modal
      show={mostrarModal}
      onHide={() => guardarNuevoMovimiento(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Nuevo{" "}
          {tipoNuevoMovimiento === TiposMovimientos.INGRESO
            ? TiposMovimientos.INGRESO.toLowerCase()
            : TiposMovimientos.EGRESO.toLowerCase()}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="agregar-movimiento-form">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Concepto</Form.Label>
            <Form.Select name="concepto" onChange={controlarConcepto}>
              {tipoNuevoMovimiento === TiposMovimientos.INGRESO
                ? conceptosIngresos.map((concepto) => (
                    <option key={concepto} value={concepto}>
                      {concepto}
                    </option>
                  ))
                : conceptosEgresos.map((concepto) => (
                    <option key={concepto} value={concepto}>
                      {concepto}
                    </option>
                  ))}
            </Form.Select>
            {controlConcepto === conceptoOtro && (
              <Form.Control
                className="concepto-otro"
                name="concepto"
                type="text"
                placeholder="Pago del alquiler"
                onInput={handleInputChange}
              />
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              name="descripcion"
              type="text"
              placeholder="Pago del alquiler del mes de febrero"
              onInput={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              name="fecha"
              type="date"
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Monto</Form.Label>
            <Form.Control
              name="monto"
              type="number"
              step={1}
              min={1}
              datatype="currency"
              placeholder="$100.00"
              onInput={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Tipo</Form.Label>
            <Form.Control
              disabled
              name="tipo"
              type="text"
              defaultValue={tipoNuevoMovimiento.toLowerCase()}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => guardarNuevoMovimiento(false)}
        >
          Cancelar
        </Button>
        <Button variant="primary" onClick={() => guardarNuevoMovimiento()}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AgregarMovimientoModal;
