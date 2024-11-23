import React, { useEffect, useState } from "react";
import ProductoCard from "./ProductoCard";

const ProductosList = ({ recargarProductos }) => {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState(""); // Campo de búsqueda

  useEffect(() => {
    const cargarDatos = async () => {
      setCargando(true);
      setError(null);

      try {
        const data = await recargarProductos(); // Carga los productos desde la API
        setProductos(Array.isArray(data) ? data : []); // Asegura que sea un array
        setProductosFiltrados(Array.isArray(data) ? data : []); // Inicializa filtrados
      } catch (err) {
        setError("Error al cargar los productos. Intenta de nuevo.");
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, [recargarProductos]);

  // Eliminar un producto
  const eliminarProducto = (id) => {
    setProductos((productos) => productos.filter((producto) => producto.id !== id));
    setProductosFiltrados((productosFiltrados) =>
      productosFiltrados.filter((producto) => producto.id !== id)
    );
  };

  // Manejo de la búsqueda
  const manejarBusqueda = (e) => {
    const valor = e.target.value.toLowerCase();
    setBusqueda(valor);

    // Filtrar productos por nombre o categoría
    const productosFiltrados = productos.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(valor) ||
        producto.categoria.toLowerCase().includes(valor)
    );
    setProductosFiltrados(productosFiltrados);
  };

  // Agrupar productos por categoría
  const productosPorCategoria = productosFiltrados.reduce((acc, producto) => {
    const { categoria } = producto;
    if (!acc[categoria]) {
      acc[categoria] = [];
    }
    acc[categoria].push(producto);
    return acc;
  }, {});

  if (cargando) {
    return <p className="text-center text-gray-500">Cargando productos...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Campo de búsqueda */}
      <div className="mb-6">
        <input
          type="text"
          value={busqueda}
          onChange={manejarBusqueda}
          placeholder="Buscar por nombre o categoría..."
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Mostrar mensaje cuando no hay productos filtrados */}
      {productosFiltrados.length === 0 ? (
        <p className="text-center text-gray-500">
          No se encontraron productos. Intenta con otro término de búsqueda.
        </p>
      ) : (
        Object.keys(productosPorCategoria).map((categoria) => (
          <div key={categoria} className="mb-8">
            <h2 className="text-xl font-bold text-blue-600 mb-4">{categoria}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productosPorCategoria[categoria].map((producto) => (
                <ProductoCard
                  key={producto.id}
                  producto={producto}
                  onEliminarProducto={eliminarProducto}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductosList;
