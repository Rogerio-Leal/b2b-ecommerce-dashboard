import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    // 1. Configuração dos provedores de login
    providers: [
        CredentialsProvider({
            name: "Credenciais",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Senha", type: "password" }
            },
            // 2. A função que valida o login
            async authorize(credentials) {
                // Para o nosso portfólio, vamos criar um "usuário mestre" de teste.
                // Em um projeto real, aqui você faria um `fetch` no banco de dados.
                if (
                    credentials?.email === "teste@empresa.com.br" &&
                    credentials?.password === "123456"
                ) {
                    // Login com sucesso! Retorna os dados do usuário.
                    return {
                        id: "1",
                        name: "Cliente VIP",
                        email: credentials.email
                    };
                }

                return null;
            }
        })
    ],

    pages: {
        signIn: "/login",
    },

    session: {
        strategy: "jwt",
    },
});

export { handler as GET, handler as POST };