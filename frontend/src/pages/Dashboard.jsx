import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {

  return (
    <div className="min-h-screen bg-gray-100">

     <Navbar />
      <header className="bg-black text-white p-5">

        <div className="max-w-6xl mx-auto flex justify-between items-center">

          <h1 className="text-2xl font-bold">
            Plataforma de Reservas
          </h1>

          <nav className="flex gap-4">

            <Link
              to="/dashboard"
              className="hover:text-gray-300"
            >
              Dashboard
            </Link>

            <Link
              to="/reservations"
              className="hover:text-gray-300"
            >
              Reservas
            </Link>

          </nav>

        </div>

      </header>

      {/* Conteúdo */}
      <main className="max-w-6xl mx-auto p-8">

        <h2 className="text-3xl font-bold mb-8">
          Dashboard
        </h2>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow">

            <h3 className="text-gray-500">
              Reservas Totais
            </h3>

            <p className="text-4xl font-bold mt-4">
              12
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow">

            <h3 className="text-gray-500">
              Confirmadas
            </h3>

            <p className="text-4xl font-bold mt-4 text-green-600">
              8
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow">

            <h3 className="text-gray-500">
              Pendentes
            </h3>

            <p className="text-4xl font-bold mt-4 text-yellow-500">
              4
            </p>

          </div>

        </div>

        {/* Ações */}
        <div className="mt-10">

          <Link
            to="/reservations"
            className="
              bg-black
              text-white
              px-6
              py-3
              rounded-xl
              hover:bg-gray-900
            "
          >
            Gerenciar Reservas
          </Link>

        </div>

      </main>

    </div>
  );
}