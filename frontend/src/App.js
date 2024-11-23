import React, { useState, useCallback } from "react";
import ProductosList from "./componentes/ProductosList";
import AgregarProducto from "./componentes/AgregarProducto";
import Registro from "./componentes/Registro";
import Login from "./componentes/Login";
import Footer from "./componentes/Footer";
import Swal from "sweetalert2"; // SweetAlert2 para alertas
import { FaPlusCircle, FaList } from "react-icons/fa"; // Iconos de navegación
import api from "./api"; // Configuración de axios

const App = () => {
  const [productos, setProductos] = useState([]);
  const [autenticado, setAutenticado] = useState(
    !!localStorage.getItem("token") // Verifica si hay un token guardado
  );
  const [vista, setVista] = useState(autenticado ? "listar" : "login"); // Vista inicial

  // Memorizar cargarProductos para evitar bucles
  const cargarProductos = useCallback(async () => {
    try {
      const response = await api.get("/productos"); // Obtiene los productos del backend
      setProductos(response.data); // Actualiza el estado
      return response.data; // Devuelve los productos para que ProductosList los use
    } catch (error) {
      console.error("Error al obtener productos:", error);
      Swal.fire("Error", "No se pudieron cargar los productos.", "error");
      throw error; // Propaga el error para manejo adicional
    }
  }, []);

  const manejarLogin = (token) => {
    localStorage.setItem("token", token); // Guarda el token en localStorage
    setAutenticado(true);
    setVista("listar");
  };

  const manejarLogout = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .post("/auth/logout")
          .then(() => {
            Swal.fire("Sesión cerrada", "Has cerrado sesión correctamente.", "success");
            localStorage.removeItem("token"); // Elimina el token del localStorage
            setAutenticado(false);
            setVista("login");
          })
          .catch((error) => {
            console.error("Error al cerrar sesión:", error);
            Swal.fire("Error", "Hubo un problema al cerrar la sesión.", "error");
          });
      }
    });
  };

  const agregarProducto = (nuevoProducto) => {
    setProductos((prevProductos) => [...prevProductos, nuevoProducto]);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Barra de Navegación */}
      {autenticado && (
        <nav className="bg-blue-600 text-white py-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center px-4">
            <h1 className="text-2xl font-bold">Gestión de Productos</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setVista("listar")}
                className={`flex items-center space-x-2 px-4 py-2 rounded ${
                  vista === "listar" ? "bg-blue-800" : "hover:bg-blue-500"
                }`}
              >
                <FaList /> <span>Lista de Productos</span>
              </button>
              <button
                onClick={() => setVista("agregar")}
                className={`flex items-center space-x-2 px-4 py-2 rounded ${
                  vista === "agregar" ? "bg-blue-800" : "hover:bg-blue-500"
                }`}
              >
                <FaPlusCircle /> <span>Agregar Producto</span>
              </button>
              <button
                onClick={manejarLogout}
                className="flex items-center space-x-2 px-4 py-2 rounded bg-red-600 hover:bg-red-700"
              >
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* Contenido Principal */}
      <main className="max-w-4xl mx-auto py-6">
        {!autenticado && vista === "login" && (
          <Login onLoginExitoso={manejarLogin} />
        )}
        {!autenticado && vista === "registro" && (
          <Registro onLoginExitoso={manejarLogin} />
        )}
        {autenticado && vista === "listar" && (
          <ProductosList recargarProductos={cargarProductos} />
        )}
        {autenticado && vista === "agregar" && (
          <AgregarProducto onProductoAgregado={agregarProducto} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
