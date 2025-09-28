export default function NotFound() {
  return (
    <main className="container-px py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mb-4 text-4xl font-bold text-white">
          Página não encontrada
        </h1>
        <p className="mb-8 text-gray-300">
          Desculpe, a página que você está procurando não existe ou foi movida.
        </p>
        <a
          href="/"
          className="rounded-lg bg-gold px-6 py-3 font-medium text-black hover:opacity-90"
        >
          Voltar para a página inicial
        </a>
      </div>
    </main>
  );
}
