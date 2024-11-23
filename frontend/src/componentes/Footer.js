import React from "react";
import { FaGithub, FaPhone, FaEnvelope } from "react-icons/fa"; // Íconos para redes sociales

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-6 w-full fixed bottom-0">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        {/* Información principal */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-sm">
            Prueba Técnica - Miguel Antonio Amaya Hernández &copy; 2024
          </p>
          <p className="text-xs text-gray-400">
            Todos los derechos reservados.
          </p>
        </div>

        {/* Íconos de redes sociales */}
        <div className="flex space-x-4">
          <a
            href="https://github.com/miguelxDd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-200"
            aria-label="GitHub"
          >
            <FaGithub className="text-lg" />
          </a>
          <a
            href="mailto:ah18059@ues.edu.sv"
            className="text-gray-400 hover:text-white transition-colors duration-200"
            aria-label="Correo Electrónico"
          >
            <FaEnvelope className="text-lg" />
          </a>
          <a
            href="tel:+50377771942"
            className="text-gray-400 hover:text-white transition-colors duration-200"
            aria-label="Llamar"
          >
            <FaPhone className="text-lg" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
