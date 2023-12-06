import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

const Mapeo = () => {
  const [data, setData] = useState(null);
  let [x, setX] = useState(0);
  let [y, setY] = useState(0);
  let [z, setZ] = useState(0);

  const mapaRef = useRef(null);

  const key = "AIzaSyCBH4hnE6U6PZVaH8qapsq8aOidA5iWZdU";

  const partida = new URLSearchParams(window.location.search).get("partida");
  const destino = new URLSearchParams(window.location.search).get("destino");

  const numero = new URLSearchParams(window.location.search).get("numero");

  useEffect(() => {
    let isFetchDataCalled = false;

    const fetchData = async () => {
      if (isFetchDataCalled) {
        return;
      }

      isFetchDataCalled = true;

      try {
        const request = await fetch(
          `http://127.0.0.1:8080/api/rastrear_vuelo?numero=${numero}`
        );
        const response = await request.json();
        setData(response.data);
        setX(response.data.x);
        setY(response.data.y);
        setZ(response.data.z);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const mapa = new window.google.maps.Map(mapaRef.current, {
      center: { lat: 0, lng: 0 },
      zoom: 1,
    });

    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer({
      map: mapa,
    });

    const request = {
      origin: getDestino(partida),
      destination: getDestino(destino),
      travelMode: window.google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(result);
      } else {
        console.error(`Error al obtener la ruta: ${status}`);
      }
    });
  }, []);

  const aumentarCoordenadas = () => {
    setX((prevX) => prevX + 283);
    setY((prevY) => prevY + 234);
    setZ((prevZ) => prevZ + 128);
  };

  const intervalo = setInterval(aumentarCoordenadas, 5000);

  setTimeout(() => {
    clearInterval(intervalo);
  }, 5000 * 20);

  const getDestino = (id) => {
    if(id == "1") {
      return "Saltillo, Coahuila"
    } else if(id == "2") {
      return "Monterrey, Nuevo Leon"
    } else if(id == "3") {
      return "Guadalajara, Jalisco"
    } else if(id == "4") {
      return "Cancun, Quintana Roo"
    } else if(id == "5") {
      return "La Paz, Baja california"
    } else if(id == "6") {
      return "Mazatlan, Sinaloa"
    } else if(id == "7") {
      return "CDMX"
    } else if(id == "8") {
      return "Queretaro, Mexico"
    }
  }

  return (
    <main>
      <Navbar />
      <div className="w-full h-full flex flex-row">
        <div ref={mapaRef} className="w-1/2 h-[500px]"></div>
        <div className="w-1/2 flex flex-col items-center py-10">
          <h1 className="text-4xl pb-5 font-extrabold">Datos sobre el vuelo</h1>
          <h4 className="text-lg"><strong>Numero de vuelo: </strong>{data && data.numero_vuelo}</h4>
          <h4 className="text-lg"><strong>Punto de partida: </strong>{getDestino(partida)}</h4>
          <h4 className="text-lg"><strong>Destino: </strong>{getDestino(destino)}</h4>
          <h4 className="text-lg"><strong>Latitud: </strong>{x}</h4>
          <h4 className="text-lg"><strong>Longitud: </strong>{y}</h4>
          <h4 className="text-lg"><strong>Altura: </strong>{z}</h4>
          <h4><strong>IP: </strong> {data && data.ip}</h4>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Mapeo;
