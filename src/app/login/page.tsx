"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError("E-mail ou senha incorretos.");
            setIsLoading(false);
        } else {
            router.push("/");
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center font-roboto">

                <div className="flex justify-start mb-6">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors font-medium">
                        <ArrowLeftIcon className="w-4 h-4" />
                        Voltar para o catálogo
                    </Link>
                </div>

                <h1 className="text-2xl font-bold text-gray-800 mb-2">Acesso ao Catálogo B2B</h1>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                    É um prazer ter você como nosso cliente. Conte conosco (sempre)!
                </p>

                <form onSubmit={handleLogin} className="space-y-5 text-left">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail corporativo</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                            placeholder="teste@empresa.com.br"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm font-medium text-center bg-red-50 p-2 rounded">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition-colors mt-2 disabled:bg-blue-400 hover:cursor-pointer"
                    >
                        {isLoading ? "Validando acesso..." : "Entrar e Enviar Orçamento"}
                    </button>
                </form>

                <div className="mt-8 text-sm text-gray-500">
                    Ainda não tem cadastro?{" "}
                    <button className="text-blue-600 hover:underline font-medium hover:cursor-pointer">
                        Crie seu cadastro
                    </button>
                </div>
            </div>
        </main>
    );
}