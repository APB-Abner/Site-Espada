import { useNavigate } from "react-router-dom";

export default function Story() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
            <h1 className="text-4xl font-bold mb-6">A História da Espada</h1>
            <p className="text-lg max-w-2xl text-center leading-relaxed">
                Há muito tempo, em uma era esquecida, a espada foi forjada por um mestre ancião
                que sacrificou sua própria essência para dar vida à lâmina. Dizem que aquele que
                a empunha não apenas obtém poder, mas carrega o peso de memórias de batalhas
                que nunca viveu...
            </p>
            <button
                onClick={() => navigate(-1)}
                className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-800 text-white font-bold rounded-lg"
            >
                Voltar
            </button>
        </div>
    );
}
