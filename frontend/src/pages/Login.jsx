import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit } = useForm();

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  async function onSubmit(data) {
    try {
      setLoading(true);

      await login(data.email, data.password);

      navigate("/dashboard");
    } catch (error) {
      alert("Email ou senha inválidos");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">

      {/* Lado esquerdo */}
      <div className="hidden lg:flex w-1/2 bg-black text-white flex-col justify-center px-20">

        <h1 className="text-5xl font-bold leading-tight">
          Plataforma
          <br />
          de Reservas
        </h1>

        <p className="mt-6 text-lg text-gray-300">
          Gerencie reservas, confirmações e horários
          de forma simples, rápida e profissional.
        </p>

        <div className="mt-10 space-y-4">

          <div className="flex items-center gap-3">
            <span className="text-green-400">✔</span>
            <p>Autenticação segura com JWT</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-green-400">✔</span>
            <p>Confirmação automática de reservas</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-green-400">✔</span>
            <p>Envio de emails com Resend</p>
          </div>

        </div>

      </div>

      {/* Lado direito */}
      <div className="flex-1 flex items-center justify-center bg-gray-100 p-6">

        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10">

          <div className="mb-8">

            <h2 className="text-3xl font-bold text-gray-800">
              Bem-vindo 👋
            </h2>

            <p className="text-gray-500 mt-2">
              Faça login para acessar sua conta.
            </p>

          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            {/* Email */}
            <div>

              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                placeholder="Digite seu email"
                {...register("email")}
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-lg
                  p-3
                  outline-none
                  focus:ring-2
                  focus:ring-black
                  transition
                "
              />

            </div>

            {/* Senha */}
            <div>

              <label className="block mb-2 text-sm font-medium text-gray-700">
                Senha
              </label>

              <input
                type="password"
                placeholder="Digite sua senha"
                {...register("password")}
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-lg
                  p-3
                  outline-none
                  focus:ring-2
                  focus:ring-black
                  transition
                "
              />

            </div>

            {/* Remember */}
            <div className="flex items-center justify-between text-sm">

              <label className="flex items-center gap-2 text-gray-600">

                <input type="checkbox" />

                Lembrar de mim

              </label>

              <button
                type="button"
                className="text-black font-medium hover:underline"
              >
                Esqueceu a senha?
              </button>

            </div>

            {/* Botão */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-black
                hover:bg-gray-900
                text-white
                p-3
                rounded-lg
                font-semibold
                transition
              "
            >

              {loading ? "Entrando..." : "Entrar"}

            </button>

          </form>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-600">

            Não possui conta?{" "}

            <Link
              to="/register"
              className="font-semibold text-black hover:underline"
            >
              Criar conta
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}