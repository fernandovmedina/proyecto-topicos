import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/footer'
import VueloCard from '../components/vuelo_cliente_card'
import {
    getId,
    getNombre,
    getEmail,
    getPassword
} from '../functions/functions'

const Home = () => {
    const userId = getId()
    const userNombre = getNombre()
    const userEmail = getEmail()
    const userPassword = getPassword()

    const [data, setData] = useState("")

    useEffect(() => {
        let isFetchDataCalled = false;

        const fetchData = async () => {
            if (isFetchDataCalled) {
                return;
            }

            isFetchDataCalled = true;

            try {
                const request = await fetch(`http://127.0.0.1:8080/api/vuelos_cliente?email=${userEmail}`);
                const response = await request.json();
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    
    let vuelos = []

    if(data && data.length) {
        for(let i = 0; i < data.length; i++) {
            vuelos.push(data[i])
        }
    }

    console.log(vuelos)
    
    return (
        <main>
            <Navbar />
                <section className="w-full h-full flex flex-row">
                    <div className="w-4/12 mt-10 text-center">
                        <h3 className='mb-10 text-2xl font-bold'>O P C I O N E S</h3>
                        <div className="flex flex-col items-center mb-10">
                            <a className="bg-cyan-500 my-1 hover:bg-cyan-950 w-[60%] hover:text-white text-lg px-3 py-2 rounded" href="/">Ir a inicio</a>
                            <a className="bg-cyan-500 my-1 hover:bg-cyan-950 w-[60%] hover:text-white text-lg px-3 py-2 rounded" href={`/reservacion?id=${userId}&nombre=${userNombre}&email=${userEmail}&password=${userPassword}`}>Crear reservacion</a>
                            <a className="bg-cyan-500 my-1 hover:bg-cyan-950 w-[60%] hover:text-white text-lg px-3 py-2 rounded" href={`/rastrear?id=${userId}&nombre=${userNombre}&email=${userEmail}&password=${userPassword}`}>Rastrear vuelo</a>
                            <a className="bg-cyan-500 my-1 hover:bg-cyan-950 w-[60%] hover:text-white text-lg px-3 py-2 rounded" href={`/vuelos_disponibles?id=${userId}&nombre=${userNombre}&email=${userEmail}&password=${userPassword}`}>Ver vuelos disponibles</a>
                            <a className="bg-cyan-500 my-1 hover:bg-cyan-950 w-[60%] hover:text-white text-lg px-3 py-2 rounded" href={`/reservaciones?id=${userId}&nombre=${userNombre}&email=${userEmail}&password=${userPassword}`}>Ver reservaciones</a>
                            <a className="bg-cyan-500 my-1 hover:bg-cyan-950 w-[60%] hover:text-white text-lg px-3 py-2 runded" href={`/new_pago?email=${userEmail}`}>Agregar nuevo metodo de pago</a>
                            <a className="bg-cyan-500 my-1 hover:bg-cyan-950 w-[60%] hover:text-white text-lg px-3 py-2 rounded" href={`/see_pago?email=${userEmail}`}>Ver pagos</a>
                        </div>
                    </div>
                    <div className="w-8/12 mt-10 flex flex-col px-5">
                        <div className="w-full flex flex-row">
                            <div className='w-1/2 text-right px-3'><h1 className="text-2xl font-bold">V U E L O S</h1></div>
                            <div className='w-1/2 text-left px-3'><h1 className="text-2xl font-bold">H E C H O S</h1></div>
                        </div>
                        {vuelos.length > 0 ? vuelos.map((vuelo) => (
                            <VueloCard 
                                key={vuelo && vuelo.id} 
                                numero={vuelo && vuelo.numero_vuelo} 
                                partida={vuelo && vuelo.partida}
                                destino={vuelo && vuelo.destino}
                            />
                        )) : 
                            <div className="w-full h-full flex items-center justify-center">
                                <h1 className="text-2xl font-extrabold">No hay vuelos hechos</h1>
                            </div>
                        }
                    </div>
                </section>
            <Footer />
        </main>
    )
}

export default Home;
