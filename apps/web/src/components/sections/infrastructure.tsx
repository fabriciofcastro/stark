"use client";

const Infrastructure = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 reveal">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Infraestrutura de TI
          </h3>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Planejamento, implementação e suporte de redes, servidores, backup e
            VPN com foco em desempenho e segurança.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            "Redes e Switching",
            "Servidores e Virtualização",
            "Backup e Recuperação",
          ].map((title) => (
            <div
              key={title}
              className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20"
            >
              <h4 className="text-xl font-semibold text-white mb-2">{title}</h4>
              <p className="text-gray-300">
                Soluções robustas e escaláveis para sua operação.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Infrastructure;
