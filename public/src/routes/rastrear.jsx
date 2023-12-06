import Navbar from "../components/Navbar"
import Footer from "../components/footer"
import Reloj from "../assets/reloj.png"
import { useState } from "react"

const Rastrear = () => {
    const [numero, setNumero] = useState(null)

    return (
        <main className="bg-cyan-500 w-full h-full">
            <Navbar />
            <div className="flex flex-row items-center pl-20 pt-20">
                <img src={Reloj} className="w-14" alt="Reloj" />
                <h3 className="font-bold text-4xl ml-5 text-white">Rastrea tu vuelo</h3>
            </div>
            <div className="flex flex-row w-full h-full pl-20 mt-10 my-40">
                <div className="flex flex-row items-center  w-full">
                    <div className="flex flex-col w-2/3 mx-5">
                        <h5 className="text-white text-base mb-2">Numero de vuelo</h5>
                        <input onChange={(e) => setNumero(e.target.value)} type="text" className="px-10 py-3.5 rounded" placeholder="Ingresa tu numero de vuelo" />
                    </div>
                    <div className="w-1/3 mt-8">
                        <a href={`/mapeo?numero=${numero}`} className="px-16 py-4 bg-cyan-800 rounded hover:bg-cyan-950">Buscar</a>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}

export default Rastrear
