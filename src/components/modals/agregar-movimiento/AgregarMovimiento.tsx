import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { AgregarMovimientoProps, Movimiento } from "../../../util/interfaces";
import { TiposMovimientos } from "../../../util/enums";

const AgregarMovimientoModal = ({
  mostrarModal,
  cerrarModalAgregarMovimiento,
  tipoNuevoMovimiento,
}: AgregarMovimientoProps) => {
  const [nuevoMovimiento, setNuevoMovimiento] = useState<Movimiento>(
    new Movimiento()
  );

  const guardarNuevoMovimiento = () => {
    nuevoMovimiento.tipo = tipoNuevoMovimiento;
    cerrarModalAgregarMovimiento(nuevoMovimiento);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const valor = Number.parseInt(value) && value;
    setNuevoMovimiento((nuevoMovimiento) => ({
      ...nuevoMovimiento,
      [name]: valor,
    }));
  };

  return (
    <Modal
      show={mostrarModal}
      onHide={guardarNuevoMovimiento}
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
            <Form.Control
              name="concepto"
              type="text"
              placeholder="Pago del alquiler"
              onInput={handleInputChange}
            />
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
              defaultValue={tipoNuevoMovimiento
                .toLowerCase()
                .slice(0, tipoNuevoMovimiento.length - 1)}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={guardarNuevoMovimiento}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={guardarNuevoMovimiento}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AgregarMovimientoModal;
