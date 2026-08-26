"use client"

import { useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function CadastroPage() {
    const [razaoSocial, setRazaoSocial] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [cep, setCep] = useState("");
    const [logradouro, setLogradouro] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [uf, setUf] = useState("");

    const [isLoadingCep, setIsLoadingCep] = useState(false);

    const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const cepDigitado = e.target.value.replace(/\D/g, "");
        setCep(cepDigitado);

        if (cepDigitado.length === 8) {
            setIsLoadingCep(true);
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cepDigitado}/json/`);
                const data = await response.json();

                if (data.erro) {
                    alert("CEP não encontrado. Por favor, verifique.");
                } else {
                    setLogradouro(data.logradouro);
                    setBairro(data.bairro);
                    setCidade(data.localidade);
                    setUf(data.uf);

                    document.getElementById("numero")?.focus();
                }
            } catch (error) {
                console.error("Falha na requisição do ViaCEP:", error);
                alert("Erro ao buscar o CEP.");
            } finally {
                setIsLoadingCep(false);
            }
        }
    }

    const handleCadastro = (e: React.SyntheticEvent) => {
        e.preventDefault();
        alert(`Cadastro da empresa ${razaoSocial} realizado com sucesso! (Simulação)`);
    }

    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-10">
            <div className="max-w-2x w-full bg-white rounded-xl shadow-sm border border-gray-100 p-8 font-roboto">
                <div className="flex justify-start mb-6">
                    <Link href="/login" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors font-medium">
                        <ArrowLeftIcon className="w-4 h-4" />
                        Voltar ao login
                    </Link>
                </div>

                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Crie a sua conta na B2B
                </h1>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                    Preencha os dados da sua empresa para ter acesso à nossa tabela de preços e fazer orçamentos.
                </p>

                <form onSubmit={handleCadastro} className="space-y-8 text-left">

                    <div>
                        <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Dados da Empresa</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Razão Social / Nome da Empresa</label>
                                <input type="text" required value={razaoSocial} onChange={(e) => setRazaoSocial(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">CNPJ</label>
                                <input type="text" required value={cnpj} onChange={(e) => setCnpj(e.target.value)} placeholder="Apenas números"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail Corporativo</label>
                                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Senha de Acesso</label>
                                <input type="password" required value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Mínimo de 6 caracteres"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                        </div>
                    </div>

                    {/* SESSÃO 2: ENDEREÇO */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Endereço de Entrega</h2>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

                            <div className="md:col-span-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
                                <div className="relative">
                                    <input type="text" required value={cep} onChange={handleCepChange} maxLength={8} placeholder="Somente números"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                                    {isLoadingCep && <span className="absolute right-3 top-2.5 text-xs text-blue-500 font-bold">Buscando...</span>}
                                </div>
                            </div>

                            <div className="md:col-span-8">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Rua / Logradouro</label>
                                <input type="text" required value={logradouro} onChange={(e) => setLogradouro(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50" />
                            </div>

                            <div className="md:col-span-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
                                <input type="text" id="numero" required value={numero} onChange={(e) => setNumero(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>

                            <div className="md:col-span-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
                                <input type="text" required value={bairro} onChange={(e) => setBairro(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50" />
                            </div>

                            <div className="md:col-span-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                                <input type="text" required value={cidade} onChange={(e) => setCidade(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50" />
                            </div>

                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">UF</label>
                                <input type="text" required value={uf} onChange={(e) => setUf(e.target.value)} maxLength={2}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 uppercase text-center" />
                            </div>

                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition-colors mt-4 text-lg"
                    >
                        Concluir Cadastro
                    </button>
                </form>
            </div>
        </main>
    )
}