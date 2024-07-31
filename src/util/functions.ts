import Swal from "sweetalert2";

export const formatCurrency = (sum: number): string => {
  return "$" + sum.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const mostrarMensajeError = (mensaje: string) => {
  Swal.fire({
    title: "Ocurrió un error",
    text: mensaje,
    icon: "error",
    confirmButtonText: "Volver",
  });
};
