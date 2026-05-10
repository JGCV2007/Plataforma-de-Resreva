import { useForm } from "react-hook-form";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  async function onSubmit(data) {

    try {

      await api.post("/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      alert("Usuário criado!");

      navigate("/login");

    } catch (error) {
      alert("Erro ao registrar");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-80"
      >

        <h1 className="text-2xl font-bold">
          Registro
        </h1>

        <input
          type="text"
          placeholder="Nome"
          {...register("name")}
          className="border p-3 rounded"
        />

        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="border p-3 rounded"
        />

        <input
          type="password"
          placeholder="Senha"
          {...register("password")}
          className="border p-3 rounded"
        />

        <button
          type="submit"
          className="bg-black text-white p-3 rounded"
        >
          Criar conta
        </button>

      </form>

    </div>
  );
}