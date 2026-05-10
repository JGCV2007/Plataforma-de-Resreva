import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";


export default function Reservations() {

  const [reservations, setReservations] = useState([]);

  async function loadReservations() {
    const response = await api.get("/reservations");

    setReservations(response.data);
  }

  async function createReservation() {

    await api.post("/reservations", {
      date: "2026-05-20",
      time: "19:00",
    });

    loadReservations();
  }

  async function confirmReservation(id) {

    await api.patch(`/reservations/${id}/confirm`);

    loadReservations();
  }

  useEffect(() => {
    loadReservations();
  }, []);

  return (
    
    <div className="p-10">
      <Navbar />
      <div className="flex justify-between mb-8">

        <h1 className="text-3xl font-bold">
          Reservas
        </h1>

        <button
          onClick={createReservation}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Nova Reserva
        </button>

      </div>

      <div className="grid gap-4">

        {reservations.map((reservation) => (

          <div
            key={reservation.id}
            className="border p-4 rounded"
          >

            <p>📅 {reservation.date}</p>

            <p>⏰ {reservation.time}</p>

            <p>📌 {reservation.status}</p>

            {reservation.status !== "confirmed" && (
              <button
                onClick={() =>
                  confirmReservation(reservation.id)
                }
                className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
              >
                Confirmar
              </button>
            )}

          </div>

        ))}

      </div>

    </div>
  );
}