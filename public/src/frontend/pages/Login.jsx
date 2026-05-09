import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit } = useForm();

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      await login(data.email, data.password);

      navigate("/dashboard");
    } catch (error) {
      alert("Erro ao fazer login");
    }
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
        />

        <input
          type="password"
          placeholder="Senha"
          {...register("password")}
        />

        <button type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}