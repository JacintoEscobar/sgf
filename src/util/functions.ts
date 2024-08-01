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

export const mostrarMensajeExito = (mensaje: string) => {
  Swal.fire({
    title: "¡Hecho!",
    text: mensaje,
    icon: "success",
    showConfirmButton: false,
    timer: 1800,
  });
};

export const mostrarMensajeAdvertencia = async (
  mensaje: string
): Promise<boolean | void> => {
  return await Swal.fire({
    title: "Advertencia!",
    text: mensaje,
    icon: "warning",
    confirmButtonText: "Continuar",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
  })
    .then((result) => {
      return result.isConfirmed;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
};
