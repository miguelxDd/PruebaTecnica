import React, { useState } from "react";
import Swal from "sweetalert2";
import api from "../api";

const AgregarProducto = () => {
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const validarCampos = () => {
    const { nombre, descripcion, precio, categoria } = producto;

    if (!nombre.trim() || nombre.length < 3) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El nombre debe tener al menos 3 caracteres.",
      });
      return false;
    }

    if (!descripcion.trim() || descripcion.length < 10) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La descripción debe tener al menos 10 caracteres.",
      });
      return false;
    }

    if (!precio || isNaN(precio) || precio <= 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El precio debe ser un número positivo.",
      });
      return false;
    }

    if (!categoria.trim() || categoria.length < 3) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La categoría debe tener al menos 3 caracteres.",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarCampos()) {
      return;
    }

    api.post("/productos", producto)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Producto agregado",
          text: "El producto se ha agregado exitosamente.",
          timer: 2000,
          showConfirmButton: false,
        });
        setProducto({ nombre: "", descripcion: "", precio: "", categoria: "" });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al agregar el producto.",
        });
        console.error("Error al agregar producto:", error);
      });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-center mb-4">Agregar Producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-2">Nombre</label>
          <input
            name="nombre"
            value={producto.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Descripción</label>
          <textarea
            name="descripcion"
            value={producto.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Precio</label>
          <input
            name="precio"
            value={producto.precio}
            onChange={handleChange}
            placeholder="Precio"
            type="number"
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Categoría</label>
          <input
            name="categoria"
            value={producto.categoria}
            onChange={handleChange}
            placeholder="Categoría"
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700"
        >
          Agregar Producto
        </button>
      </form>
    </div>
  );
};

export default AgregarProducto;
