export default function NotFound() {
  return (
    <div className="justify-center items-center min-h-screen text-2xl flex flex-col space-y-8">
      <div className="grid gap-y-5 justify-center bg-white text-black rounded-3xl w-1/3 max-w-xl px-14 py-16">
        <h3 className="font-semibold">Esta pagina no existe</h3>
        <div className="text-lg">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-lime-700 text-center">
            Inicia sesión
          </a>
        </div>
      </div>
    </div>
  );
}
