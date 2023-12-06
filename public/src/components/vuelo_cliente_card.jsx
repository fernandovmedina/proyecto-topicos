import Avion from "../assets/avion_de_papel.png"

const VueloCard = ({ numero, partida, destino }) => {
    return (
        <div className="flex flex-row w-full h-full mx-2 my-5 justify-center border-8 border-separate rounded-xl border-black">
            <div className="w-1/3 flex items-center justify-center">
                <img src={Avion} alt="Avion de papel" />
            </div>
            <div className="w-2/3 py-5">
                <h1 className="font-bold my-2 text-xl">Numero de vuelo: <strong>{numero}</strong></h1>
                <h1 className="font-bold my-2 text-xl">Punto de partida: <strong>{partida}</strong></h1>
                <h1 className="font-bold my-2 text-xl">Destino: <strong>{destino}</strong></h1>
                <a className="text-lg font-bold hover:bg-cyan-950 hover:text-white px-4 py-2 bg-cyan-500 rounded-lg">Reservar vuelo</a>
            </div>
        </div>
    )
}

export default VueloCard;
