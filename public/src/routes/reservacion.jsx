import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { getEmail } from "../functions/functions";

const Reservacion = () => {
  const [partida, setPartida] = useState("1");
  const [destino, setDestino] = useState("1");
  const [tipo, setTipo] = useState("redondo");

  const email = getEmail()

  const handleReservacion = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://127.0.0.1:8080/api/reservacion?email=${email}&tipo=${tipo}&partida=${partida}&destino=${destino}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
      } else {
        console.error(
          "Error en la solicitud de inicio de sesión:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error en la solicitud de inicio de sesión", error);
    }
  };

  return (
    <main className="w-full">
      <Navbar />
      <div className="flex flex-col mt-40 pl-20 pb-20 w-full h-full">
        <form onSubmit={handleReservacion}>
          <div>
            <select
              onChange={(e) => setTipo(e.target.value)}
              className="bg-white text-black pl-1 pr-32 py-3 border border-black rounded"
            >
              <option className="bg-white text-black" value="redondo">
                Ida y vuelta
              </option>
              <option className="bg-white text-black" value="normal">
                Solo ida
              </option>
            </select>
          </div>
          <div className="flex flex-row mt-10 w-full">
            <div className="w-1/3">
              <h5 className="font-light mb-3 text-sm">ORIGEN</h5>
              <select
                onChange={(e) => setPartida(e.target.value)}
                className="bg-white text-black pl-1 pr-48 py-3 border border-black rounded"
              >
                <option value="1">Saltillo, Coahuila</option>
                <option value="2">Monterrey, Nuevo Leon</option>
                <option value="3">Guadalajara, Jalisco</option>
                <option value="4">Cancun, Quintana Roo</option>
                <option value="5">La Paz, Baja California</option>
                <option value="6">Mazatlan, Sinaloa</option>
                <option value="7">CDMX</option>
                <option value="8">Queretaro, Mexico</option>
              </select>
            </div>
            <div className="w-1/3">
              <h5 className="font-light mb-3 text-sm">DESTINO</h5>
              <select
                onChange={(e) => setDestino(e.target.value)}
                className="bg-white text-black pl-1 pr-48 py-3 border border-black rounded"
              >
                <option value="1">Saltillo, Coahuila</option>
                <option value="2">Monterrey, Nuevo Leon</option>
                <option value="3">Guadalajara, Jalisco</option>
                <option value="4">Cancun, Quintana Roo</option>
                <option value="5">La Paz, Baja California</option>
                <option value="6">Mazatlan, Sinaloa</option>
                <option value="7">CDMX</option>
                <option value="8">Queretaro, Mexico</option>
              </select>
            </div>
            <div className="w-1/3">
              <h5 className="font-light text-sm mb-3">FECHAS</h5>
              <input
                type="date"
                className="py-3 px-20 bg-gray-100 text-black"
              />
            </div>
          </div>
          <div className="flex justify-end pr-36 pt-10">
            <a
              href={`/mapeo?numero=12-897&partida=${partida}&destino=${destino}`}
              className="bg-cyan-500 px-16 py-2 rounded hover:bg-cyan-800"
            >
              Buscar vuelo
            </a>
          </div>
        </form>
      </div>
      <Footer />
    </main>
  );
};

export default Reservacion;
