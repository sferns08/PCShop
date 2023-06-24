import { useState } from "react";
import axios from "axios";

export const useDevices = () =>{
    const [devices, setDevices] = useState([]);

    const addDevice = async (data) => {
        let service = "";
        if(data.get('http')) {
            service = "_http._tcp";
        } else if(data.get('printer')) {
            service = "_printer._tcp";
        }
        axios.post("http://127.0.0.1:8080/devices/",{
            DeviceName: data.get('devicename'),
            Ip: data.get('ip'),
            Service: service,
            Port: parseInt(data.get('port'))
        },{
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        }).then((response) => {
            alert(response.data);
        }).catch((error) => {
            console.log("Respuesta fallida: ",error)
        });
    }

  
    const getDevices = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8080/devices/`, {
                withCredentials: true,
            });
            console.log("Informacion de la respuesta", response.data);
            setDevices(response.data);
        } catch (error) {
            console.log(error);
        }
    }
  
    const deleteDevice = async (indice) => {
        console.log(indice);
        try {
        const response = await axios.delete(`http://127.0.0.1:8080/devices/${indice}`,{});
        console.log(response.data);
        const updatedDevices = devices.filter(
            (device) => device.DeviceID !== indice
        );
        setDevices(updatedDevices);
        } catch (error) {
        console.error(error);
        }
    }
  
    return{
      devices,
      addDevice,
      deleteDevice,
      getDevices
    }
  
}