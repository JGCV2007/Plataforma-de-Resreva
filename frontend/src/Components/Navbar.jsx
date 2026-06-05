import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <header className="bg-black text-white px-6 py-4">

      <div className="max-w-6xl mx-auto flex justify-between items-center">

        {/* Logo */}
        <div className="text-xl font-bold">
          📅 ReservasApp
        </div>

        {/* Links */}
        <nav className="flex gap-6 items-center text-sm">

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

        {/* Ações */}
        <div>

          <button
            onClick={handleLogout}
            className="
              bg-white
              text-black
              px-4
              py-2
              rounded-lg
              font-semibold
              hover:bg-gray-200
              transition
            "
          >
            Sair
          </button>

        </div>

      </div>

    </header>
  );
}