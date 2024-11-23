import React from "react";
import Swal from "sweetalert2";
import api from "../api"; // Configuración de axios
import { FaTrashAlt, FaTag, FaDollarSign } from "react-icons/fa"; // Íconos de react-icons

const ProductoCard = ({ producto, onEliminarProducto }) => {
  const manejarEliminar = async () => {
    const confirmacion = await Swal.fire({
      title: "¿Estás seguro?",
      text: `Eliminarás el producto "${producto.nombre}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirmacion.isConfirmed) {
      try {
        await api.delete(`/productos/${producto.id}`); // Elimina el producto en el backend
        Swal.fire("Eliminado", "El producto ha sido eliminado.", "success");
        onEliminarProducto(producto.id); // Actualiza la lista en el frontend
      } catch (error) {
        console.error("Error al eliminar producto:", error);
        Swal.fire("Error", "No se pudo eliminar el producto.", "error");
      }
    }
  };

  return (
    <div className="border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
      <div className="p-6">
        {/* Título del producto con ícono */}
        <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center">
          <FaTag className="mr-2 text-blue-500" />
          {producto.nombre}
        </h2>

        {/* Descripción */}
        <p className="text-gray-600 mb-4">{producto.descripcion}</p>

        {/* Precio con ícono */}
        <p className="text-lg font-semibold text-green-500 mb-4 flex items-center">
          <FaDollarSign className="mr-2 text-green-500" />
          ${producto.precio}
        </p>

        {/* Botón de eliminar con ícono */}
        <button
          onClick={manejarEliminar}
          className="flex items-center justify-center px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          <FaTrashAlt className="mr-2" />
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ProductoCard;
