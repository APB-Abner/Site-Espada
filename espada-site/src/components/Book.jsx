import { useNavigate } from "react-router-dom";
import Images from "../data/images_history.js";



export default function Story() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen bg-black">
                <button onClick={() => navigate("/")}
                    className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-800 text-white font-bold rounded-lg w-1/12 "
                >
                    Voltar para Home
                </button>
                <div className="flex flex-col items-center min-h-screen justify-center  bg-black text-white p-8">

                    <h1 className="text-4xl font-bold mb-6">A Lendária Espada Cósmica</h1>
                    <p className="text-lg max-w-2xl text-center leading-relaxed">
                        Há muito tempo, em uma era esquecida, a espada foi forjada por um mestre ancião
                        que sacrificou sua própria estrela para dar vida à lâmina. Dizem que aquele que
                        a empunha não apenas obtém poder, mas carrega o peso de memórias de batalhas
                        que nunca viveu...
                    </p>
                </div>
                <div className="w-8/10 self-center justify-center items-center bg-black "> 
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl text-center mt-8 text-gray-800">A Forja da Espada</h1>

                    <p className="text-lg leading-relaxed text-gray-600 mt-4">
                        A lâmina não existia—não ainda. Apenas um espaço vazio sobre a mesa, esperando ser preenchido.
                    </p>

                    {/* Foto dentro do celular */}
                    <div className="flex justify-center mt-8">
                        <div className="bg-black w-72 h-96 rounded-2xl flex justify-center items-center">
                            <img
                                src={Images.imagem1}
                                alt="Referência da espada sobre a mesa"
                                className="w-64 h-96 object-cover rounded-xl"
                            />
                        </div>
                    </div>

                    <p className="text-lg leading-relaxed text-gray-600 mt-4">
                        Com a referência posicionada, os primeiros traços começaram a surgir. No centro, um brilho azul revelava onde o
                        coração da espada pulsaria...
                    </p>

                    {/* Álbum de fotos sanfonado */}
                    <div className="flex justify-center gap-4 mt-8">
                        <div className="w-48 h-72 overflow-hidden rounded-xl cursor-pointer">
                            <img src={Images.imagem2_1} alt="O núcleo da espada iluminado no escuro" className="w-full h-full object-cover" />
                        </div>
                        <div className="w-48 h-72 overflow-hidden rounded-xl cursor-pointer">
                            <img src={Images.imagem2_2} alt="O núcleo da espada iluminado no escuro" className="w-full h-full object-cover" />
                        </div>
                        <div className="w-48 h-72 overflow-hidden rounded-xl cursor-pointer">
                            <img src={Images.imagem2_3} alt="O núcleo da espada iluminado no escuro" className="w-full h-full object-cover" />
                        </div>
                    </div>

                    <p className="text-lg leading-relaxed text-gray-600 mt-4">
                        Mas a lâmina ainda não existia...
                    </p>

                    {/* Polaroids */}
                    <div className="flex justify-around flex-wrap gap-8 mt-12">
                        <div className="flex flex-col h-fit w-36 bg-white border-4 border-gray-800 rounded-lg shadow-md text-center p-2">
                            <img
                                src={Images.imagem3_1}
                                alt="A estrutura bruta da lâmina começando a tomar forma"
                                className="w-full h-36 object-cover rounded-md"
                            />
                            <p className="text-sm text-gray-700 mt-2">A estrutura bruta da lâmina começando a tomar forma</p>
                        </div>
                        <div className="flex flex-col h-fit w-36 bg-white border-4 border-gray-800 rounded-lg shadow-md text-center p-2">
                            <img
                                src={Images.imagem3_2}
                                alt="A guarda da espada, com os anéis posicionados"
                                className="w-full h-36 object-cover rounded-md"
                            />
                            <p className="text-sm text-gray-700 mt-2">A lámina da espada, extruda pra se dividir posicionados</p>
                        </div>
                        <div className="flex flex-col h-fit w-36 bg-white border-4 border-gray-800 rounded-lg shadow-md text-center p-2">
                            <img
                                src={Images.imagem3_3}
                                alt="A guarda da espada, com os anéis posicionados"
                                className="w-full h-36 object-cover rounded-md"
                            />
                            <p className="text-sm text-gray-700 mt-2">A guarda da espada, com os anéis posicionados</p>
                        </div>
                    </div>

                    <p className="text-lg leading-relaxed text-gray-600 mt-4">
                        Algumas partes precisavam desaparecer. A referência mostrava lacunas, espaços onde o metal parecia se partir...
                    </p>

                    {/* Mais Polaroids */}
                    <div className="flex justify-around flex-wrap gap-8 mt-12">
                        <div className="flex flex-col h-fit w-36 bg-white border-4 border-gray-800 rounded-lg shadow-md text-center p-2">
                            <img
                                src={Images.imagem4_1}
                                alt="Polígono deformado para criar as pedras flutuantes"
                                className="w-full h-36 object-cover rounded-md"
                            />
                            <p className="text-sm text-gray-700 mt-2">Polígono deformado para criar as pedras flutuantes</p>
                        </div>
                        <div className="flex flex-col h-fit w-36 bg-white border-4 border-gray-800 rounded-lg shadow-md text-center p-2">
                            <img
                                src={Images.imagem4_2}
                                alt="A lâmina quebrada renasce"
                                className="w-full h-36 object-cover rounded-md"
                            />
                            <p className="text-sm text-gray-700 mt-2">A lâmina quebrada renasce</p>
                        </div>
                    </div>

                    <p className="text-lg leading-relaxed text-gray-600 mt-4">
                        E então, a lâmina quebrada renasceu...
                    </p>
                </div>

            </div>
        </div>
    );
}
