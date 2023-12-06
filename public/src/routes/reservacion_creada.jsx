import Navbar from '../components/Navbar'
import Footer from '../components/footer'
import { getEmail } from '../functions/functions'
import { useState, useEffect } from 'react'
import Success from '../assets/success.png'

const ReservacionCreada = () => {
    const [data, setData] = useState(null)

    const email = getEmail()

    useEffect(() => {
        let isFetchDataCalled = false;

        const fetchData = async () => {
            if (isFetchDataCalled) {
                return;
            }

            isFetchDataCalled = true;

            try {
                const request = await fetch(`http://127.0.0.1:8080/api/new_reservacion?email=${email}`);
                const response = await request.json();
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    console.log(data)

    return (
        <main>
            <Navbar />
            <div className="w-full h-full flex flex-row">
                <div className="w-1/2 flex items-center justify-center">
                    <img className="w-24" src={Success} />
                </div>
                <div className="w-1/2 py-10">
                    <h1 className="text-3xl font-extrabold">Datos sobre la reservacion</h1>
                    <h4 className="text-lg"><strong className="pr-3">Id:</strong>{data.id}</h4>
                    <h4 className="text-lg"><strong className="pr-3">Nombre:</strong>{data.nombre}</h4>
                    <h4 className="text-lg"><strong className="pr-3">Email:</strong>{data.email}</h4>
                    <h4 className="text-lg"><strong className="pr-3">Fecha:</strong>{data.fecha}</h4>
                    <h4 className="text-lg"><strong className="pr-3">Numero de vuelo:</strong>{data.numero_vuelo}</h4>
                    <h4 className="text-lg"><strong className="pr-3">Tipo de vuelo:</strong>{data.tipo_vuelo}</h4>
                    <h4 className="text-lg"><strong className="pr-3">Punto de partida:</strong>{data.partida}</h4>
                    <h4 className="text-lg"><strong className="pr-3">Destino:</strong>{data.destino}</h4>
                </div>
            </div>
            <Footer />
        </main>
    )
}

export default ReservacionCreada;
