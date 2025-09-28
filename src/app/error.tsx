"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, Home, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Oops! Algo deu errado
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Ocorreu um erro inesperado. Tente novamente ou volte para a página inicial.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <button
              onClick={reset}
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-gold-600 hover:bg-brand-gold-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold-500"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Tentar novamente
            </button>

            <Link
              href="/"
              className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold-500"
            >
              <Home className="w-4 h-4 mr-2" />
              Voltar ao início
            </Link>
          </div>

          {process.env.NODE_ENV === "development" && (
            <div className="mt-6 p-4 bg-gray-100 rounded-md">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Detalhes do erro (desenvolvimento):
              </h3>
              <pre className="text-xs text-gray-600 overflow-auto">
                {error.message}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
