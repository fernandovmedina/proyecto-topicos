import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import VueloCard from "../components/vuelo_card";

const VuelosDisponibles = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        let isFetchDataCalled = false;

        const fetchData = async () => {
            if (isFetchDataCalled) {
                return;
            }

            isFetchDataCalled = true;

            try {
                const request = await fetch('http://127.0.0.1:8080/api/vuelos_disponibles');
                const response = await request.json();
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    let vuelos = []

    for(let i = 0; i < 8; i++) {
        vuelos.push(data[i])
    }

    let vuelos1 = []
    let vuelos2 = []
    let vuelos3 = []

    vuelos1.push(vuelos[0],vuelos[1],vuelos[2])
    vuelos2.push(vuelos[3],vuelos[4])
    vuelos3.push(vuelos[5],vuelos[6],vuelos[7])

    console.log(vuelos1)

    return (
        <main>
            <Navbar />
            <section>
                <div className="w-full flex flex-row">
                {vuelos1.map((vuelo) => (
                    <VueloCard 
                        key={vuelo && vuelo.id}
                        id={vuelo && vuelo.id}
                        punto_de_partida={vuelo && vuelo.punto_de_partida}
                        destino={vuelo && vuelo.destino}
                        fecha={vuelo && vuelo.fecha}
                    />
                ))}
                </div>
                <div className="w-full flex flex-row">
                    {vuelos2.map((vuelo) => (
                        <VueloCard 
                            key={vuelo && vuelo.id}
                            id={vuelo && vuelo.id}
                            punto_de_partida={vuelo && vuelo.punto_de_partida}
                            destino={vuelo && vuelo.destino}
                            fecha={vuelo && vuelo.fecha}
                        />
                    ))}
                </div>
                <div className="w-full flex flex-row">
                    {vuelos3.map((vuelo) => (
                        <VueloCard 
                            key={vuelo && vuelo.id}
                            id={vuelo && vuelo.id}
                            punto_de_partida={vuelo && vuelo.punto_de_partida}
                            destino={vuelo && vuelo.destino}
                            fecha={vuelo && vuelo.fecha}
                        />
                    ))}
                </div>
            </section>
            <Footer />
        </main>
    );
}

export default VuelosDisponibles;
