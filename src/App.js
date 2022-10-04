import { motion, useScroll } from "framer-motion"
import { set, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import './index.css'
import { useEffect, useState } from "react";
import axios from "axios";

const schema = yup.object({
    firstName: yup.string().required(),
    age: yup.number().positive().integer().required(),
  }).required();

// grafica

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  import { Bar } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  export const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => 30),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => 58),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

export default function App() {

    const { scrollYProgress } = useScroll();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    console.log(watch("example"));

    const [gasolinerias, setGasolineias] = useState(false)

    useEffect(()=>{
        axios.get('https://api.datos.gob.mx/v1/precio.gasolina.publico')
        .then(function (response) {
            var newGasolinerias = []
            for (let i = 0; i < 10; i++) {
                newGasolinerias.push(response.data.results[i])
            }
            console.log(newGasolinerias);
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
        });
    },[])

    return (
        <main className="bg-gray-900">
            <motion.div
                className="progress-bar"
                style={{ scaleX: scrollYProgress }}
            />

            <section className="formulario">
                {/* "handleSubmit" validará sus entradas antes de invocar "onSubmit" */}
                <form className="w-80" onSubmit={handleSubmit(onSubmit)}>
                    <input className="w-full h-8 m-1 bg-transparent rounded pl-2 text-white" style={{border: "1px solid #FFF"}} type="email" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
                    <p>{errors.email?.message}</p>
                    <input className="w-full h-8 m-1 bg-transparent rounded pl-2 text-white" style={{border: "1px solid #FFF"}}  type="password" placeholder="Contraseña" {...register("pass", { required: true })} />
                    <p>{errors.email?.pass}</p>
                    <input className="w-full h-8 m-1 bg-white rounded" type="submit" />
                </form>
            </section>
            <section className="">
                <Bar options={options} data={data} />
            </section>
        </main>
    )
}