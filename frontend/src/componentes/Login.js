import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import {
  FaUserAlt,
  FaLock,
  FaEnvelope,
  FaCalendar,
  FaPhone,
  FaIdBadge,
} from "react-icons/fa";

const Login = ({ onLoginExitoso }) => {
  const [modo, setModo] = useState("login"); // "login" o "register"
  const [credenciales, setCredenciales] = useState({
    username: "",
    password: "",
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    fecha_nacimiento: "",
  });
  const [errores, setErrores] = useState({}); // Manejo dinámico de errores

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredenciales({ ...credenciales, [name]: value });
    setErrores({ ...errores, [name]: "" }); // Limpia el error del campo al escribir
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    const url =
      modo === "login"
        ? "http://localhost:8080/api/auth/login"
        : "http://localhost:8080/api/auth/register";

    try {
      const data = {
        username: credenciales.username,
        password: credenciales.password,
        ...(modo === "register" && {
          nombre: credenciales.nombre,
          apellido: credenciales.apellido,
          email: credenciales.email,
          telefono: credenciales.telefono,
          fechaNacimiento: credenciales.fecha_nacimiento,
        }),
      };

      const response = await axios.post(url, data);

      if (modo === "login") {
        const token = response.data.token;
        localStorage.setItem("token", token);
        Swal.fire("¡Éxito!", "Inicio de sesión exitoso.", "success");
        onLoginExitoso(token);
      } else {
        Swal.fire(
          "¡Registro exitoso!",
          "Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión.",
          "success"
        );
        setModo("login");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Ocurrió un problema. Intenta de nuevo.";
      Swal.fire("Error", errorMessage, "error");
      console.error("Error:", error);
    }
  };

  const validarFormulario = () => {
    let nuevosErrores = {};

    if (modo === "register") {
      if (!credenciales.nombre.trim())
        nuevosErrores.nombre = "El nombre es obligatorio.";
      if (!credenciales.apellido.trim())
        nuevosErrores.apellido = "El apellido es obligatorio.";
      if (!/\S+@\S+\.\S+/.test(credenciales.email))
        nuevosErrores.email = "El correo no es válido.";
      if (!credenciales.telefono.trim())
        nuevosErrores.telefono = "El teléfono es obligatorio.";
      if (!/^\d{10,15}$/.test(credenciales.telefono))
        nuevosErrores.telefono =
          "El número de teléfono debe contener entre 10 y 15 dígitos.";
      if (!credenciales.fecha_nacimiento.trim()) {
        nuevosErrores.fecha_nacimiento = "La fecha de nacimiento es obligatoria.";
      } else if (!validarEdad(credenciales.fecha_nacimiento)) {
        nuevosErrores.fecha_nacimiento =
          "Debes tener al menos 18 años para registrarte.";
      }
    }

    if (!credenciales.username.trim())
      nuevosErrores.username = "El usuario es obligatorio.";
    if (!credenciales.password.trim())
      nuevosErrores.password = "La contraseña es obligatoria.";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const validarEdad = (fechaNacimiento) => {
    const hoy = new Date();
    const fechaNacimientoDate = new Date(fechaNacimiento);
    const edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
    const mes = hoy.getMonth() - fechaNacimientoDate.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimientoDate.getDate())) {
      return edad - 1 >= 18;
    }
    return edad >= 18;
  };

  const calcularFechaMaxima = () => {
    const hoy = new Date();
    const fechaMax = new Date(
      hoy.getFullYear() - 18,
      hoy.getMonth(),
      hoy.getDate()
    );
    return fechaMax.toISOString().split("T")[0]; // Formato YYYY-MM-DD
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 to-purple-800">
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-md w-full transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-4">
          {modo === "login" ? "Iniciar Sesión" : "Registrarse"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {modo === "register" && (
            <>
              <CampoTexto
                icono={<FaIdBadge />}
                name="nombre"
                placeholder="Nombre"
                value={credenciales.nombre}
                error={errores.nombre}
                onChange={handleChange}
              />
              <CampoTexto
                icono={<FaIdBadge />}
                name="apellido"
                placeholder="Apellido"
                value={credenciales.apellido}
                error={errores.apellido}
                onChange={handleChange}
              />
              <CampoTexto
                icono={<FaPhone />}
                name="telefono"
                placeholder="Teléfono"
                value={credenciales.telefono}
                error={errores.telefono}
                onChange={handleChange}
              />
              <CampoTexto
                icono={<FaCalendar />}
                name="fecha_nacimiento"
                placeholder="Fecha de Nacimiento"
                type="date"
                value={credenciales.fecha_nacimiento}
                error={errores.fecha_nacimiento}
                onChange={handleChange}
                max={calcularFechaMaxima()} // Restringe a mayores de 18 años
              />
              <CampoTexto
                icono={<FaEnvelope />}
                name="email"
                placeholder="Correo Electrónico"
                value={credenciales.email}
                error={errores.email}
                onChange={handleChange}
              />
            </>
          )}
          <CampoTexto
            icono={<FaUserAlt />}
            name="username"
            placeholder="Nombre de usuario"
            value={credenciales.username}
            error={errores.username}
            onChange={handleChange}
          />
          <CampoTexto
            icono={<FaLock />}
            name="password"
            placeholder="Contraseña"
            value={credenciales.password}
            error={errores.password}
            onChange={handleChange}
            type="password"
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded hover:from-indigo-600 hover:to-purple-700 transition-all duration-300"
          >
            {modo === "login" ? "Iniciar Sesión" : "Registrarse"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          {modo === "login" ? (
            <>
              ¿No tienes una cuenta?{" "}
              <button
                onClick={() => setModo("register")}
                className="text-indigo-500 hover:underline"
              >
                Regístrate aquí
              </button>
            </>
          ) : (
            <>
              ¿Ya tienes una cuenta?{" "}
              <button
                onClick={() => setModo("login")}
                className="text-indigo-500 hover:underline"
              >
                Inicia sesión aquí
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

const CampoTexto = ({
  icono,
  name,
  placeholder,
  value,
  onChange,
  error,
  type = "text",
  ...props
}) => (
  <div className="relative">
    <span className="absolute left-3 top-3 text-gray-400">{icono}</span>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full py-3 pl-10 pr-4 border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none`}
      {...props}
    />
    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
  </div>
);

export default Login;
