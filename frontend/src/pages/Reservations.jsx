import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../Components/Navbar";

export default function Reservations() {

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    date: "",
    time: "",
  });

  // 🔄 carregar reservas
  async function loadReservations() {
    try {
      setLoading(true);

      const response = await api.get("/reservations");

      setReservations(response.data);

    } catch (error) {
      console.log("Erro ao buscar reservas", error);
    } finally {
      setLoading(false);
    }
  }

  // ➕ criar reserva
  async function createReservation(e) {
    e.preventDefault();

    try {
      await api.post("/reservations", form);

      setForm({ date: "", time: "" });

      loadReservations();

    } catch (error) {
      alert("Erro ao criar reserva");
    }
  }

  // ✔ confirmar reserva
  async function confirmReservation(id) {
    try {
      await api.patch(`/reservations/${id}/confirm`);

      loadReservations();

    } catch (error) {
      alert("Erro ao confirmar reserva");
    }
  }

  useEffect(() => {
    loadReservations();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-6xl mx-auto p-8">

        <h1 className="text-3xl font-bold mb-6">
          Reservas
        </h1>

        {/* FORMULÁRIO */}
        <form
          onSubmit={createReservation}
          className="bg-white p-6 rounded-2xl shadow mb-8 flex gap-4"
        >

          <input
            type="date"
            value={form.date}
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
            className="border p-3 rounded-lg w-full"
            required
          />

          <input
            type="time"
            value={form.time}
            onChange={(e) =>
              setForm({ ...form, time: e.target.value })
            }
            className="border p-3 rounded-lg w-full"
            required
          />

          <button
            type="submit"
            className="bg-black text-white px-6 rounded-lg"
          >
            Criar
          </button>

        </form>

        {/* LISTA */}
        <div className="grid gap-4">

          {loading && (
            <p>Carregando reservas...</p>
          )}

          {!loading && reservations.length === 0 && (
            <p>Nenhuma reserva encontrada.</p>
          )}

          {reservations.map((res) => (
            <div
              key={res.id}
              className="bg-white p-5 rounded-2xl shadow flex justify-between items-center"
            >

              {/* INFO */}
              <div>
                <p className="font-bold">
                  📅 {res.date}
                </p>

                <p className="text-gray-600">
                  ⏰ {res.time}
                </p>

                <p className="mt-1 text-sm">
                  Status:{" "}
                  <span className="font-semibold">
                    {res.status}
                  </span>
                </p>
              </div>

              {/* AÇÕES */}
              <div className="flex gap-2">

                {res.status !== "confirmed" && (
                  <button
                    onClick={() =>
                      confirmReservation(res.id)
                    }
                    className="
                      bg-green-600
                      text-white
                      px-4
                      py-2
                      rounded-lg
                    "
                  >
                    Confirmar
                  </button>
                )}

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}