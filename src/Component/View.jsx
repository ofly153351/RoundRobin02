import React, { useEffect, useState } from 'react'
import { Clock } from '../Controller/Controller'
import RRController from '../Controller/Controller'

function View() {
    const [time, setTime] = useState(0);
    const [rrController] = useState(new RRController());
    const [pcblist, setPcblist] = useState([]);
    const [terminateList, setTerminateList] = useState([]);
    const [ReadyQueueList, setReadyQueueList] = useState([]);
    const [deviceList, setDeviceList] = useState([]);
    const [quantumTime] = useState(rrController.quantumTime);


    //ปุ่มกด
    const AddProcess = () => {
        rrController.addProcess();
    }

    const Reset = () => {
        rrController.Reset();
    }

    const Terminate = () => {
        rrController.Terminate();
    }

    const AddDevice = () => {
        rrController.handleAddDevice();
    }

    const EndDevice = () => {
        rrController.handleEndDevice();
    }


    useEffect(() => {
        const intervalid = Clock(setTime);
        const interval = setInterval(() => {
            setPcblist([...rrController.PcbList]);
            setTerminateList([...rrController.TerminateList]);
            setReadyQueueList([...rrController.ReadyQueue]);
            setDeviceList([...rrController.DeviceList]);
        }, 100);
        return () => {
            clearInterval(interval);
            clearInterval(intervalid);
        };
    }, []);

    return (
        <div className='md:grid'>
            <div className="w-full h-24 flex justify-around items-center bg-red-500 font-bold text-white">
                <div className="text-3xl">Round Robin</div>
                <>
                    <div className="flex gap-10 text-purple-900 md:text-sm">
                        <div className="text-xl">Avg Waiting : {rrController.AVGWaitting}</div>
                        <div className="text-xl">Avg Turnaround : {rrController.AVGTurnaround} </div>
                        <div className="text-xl">CPU Process : {pcblist.map((item, index) => item.status === "Running" &&
                            (
                                <span key={item.processName + index} >
                                    {item.processName}
                                </span>
                            ))}
                        </div>
                        <div className="text-xl">I/O Process : {deviceList.map((item, index) => item.status === "Running" &&
                            (
                                <span key={item.processName + index}>
                                    {item.processName}
                                </span>
                            ))} </div>
                    </div>
                    <div className="text-3xl">clock : {time} </div>
                </>
            </div>
            <div className="flex flex-col md:flex-row gap-10 ">
                <div className='mt-10 w-full md:w-4/6 h-[740px] shadow-2xl'>
                    <div className="flex font-bold text-3xl bg-yellow-300 p-5 rounded-t-xl justify-between items-center">
                        <div className='flex gap-10 md: text-xl'>
                            <>
                                <h1>Job Queue</h1>
                            </>
                            <>
                                <h1>QuantumTime : {quantumTime}</h1>
                            </>
                        </div>
                        <div className='flex gap-2 md:flex flex-col'>
                            <div>
                                <button onClick={AddProcess} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900" >ADD</button>
                            </div>
                            <div>
                                <button onClick={Terminate} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Terminate</button>
                            </div>
                            <div>
                                <button onClick={Reset} type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Reset</button>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-y-scroll h-[92%] bg-pink-100">
                        <table className="w-full border-2 border-black">
                            <thead>
                                <tr className='border-2 border-black'>
                                    <th className='border-2 border-black p-5'>ProcessName</th>
                                    <th className='border-2 border-black p-5'>Arrival Time</th>
                                    <th className='border-2 border-black p-5'>Quantum Time</th>
                                    <th className='border-2 border-black p-5'>Burst Time</th>
                                    <th className='border-2 border-black p-5'>Waiting Time</th>
                                    <th className='border-2 border-black p-5'>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pcblist.map((process, index) => (
                                    <tr key={index} className={`text-sm ${process.status === "Running" ? 'bg-green-200' : ''} 
                                                                ${process.status === "Ready" ? 'bg-yellow-200' : ''}
                                                                ${process.status === "New" ? 'bg-blue-200' : ''} 
                                                                ${process.status === "Waiting" ? 'bg-orange-200' : ''} 
                                                                `}>
                                        <td className='border-2 border-black p-2'>{process.processName}</td>
                                        <td className='border-2 border-black p-2'>{process.arrivalTime}</td>
                                        <td className='border-2 border-black p-2'>{process.quantumTime}</td>
                                        <td className='border-2 border-black p-2'>{process.burstTime}</td>
                                        <td className='border-2 border-black p-2'>{process.waitingTime}</td>
                                        <td className='border-2 border-black p-2'>{process.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <>
                    <div className="grid md:flex md:flex-col md:gap-10">
                        <div className="mt-10  md:mr-10 shadow-2xl h-[20rem]  ">
                            <div className="flex font-bold text-3xl bg-green-300 p-5 rounded-t-xl justify-between items-center ">
                                <div>
                                    <h1>Ready Queue</h1>
                                </div>
                            </div>
                            <div className=" overflow-y-scroll h-[250px] bg-[whiteSmoke] ">
                                <table className="w-full border-2 border-black">
                                    <thead>
                                        <tr className='border-2 border-black'>
                                            <th className='border-2 border-black p-2'>ProcessName</th>
                                            <th className='border-2 border-black p-2'>Arrival Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ReadyQueueList.map((item, index) => (
                                            <tr key={index} className={`text-sm bg-yellow-200`}>
                                                <td className='border-2 border-black p-2 '>{item.processName}</td>
                                                <td className='border-2 border-black p-2 '>{item.arrivalTime}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="mt-10  md:mr-10 shadow-2xl ">
                            <div className="flex font-bold text-3xl bg-yellow-300 p-5 rounded-t-xl justify-between items-center">
                                <div>
                                    <h1>I/O Queue</h1>
                                </div>
                                <div className='flex gap-2'>
                                    <div>
                                        <button onClick={AddDevice} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900">ADD</button>
                                    </div>
                                    <div>
                                        <button onClick={EndDevice} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">END</button>
                                    </div>
                                </div>
                            </div>
                            <div className="overflow-y-scroll h-80 bg-[whiteSmoke] ">
                                <table className="w-full border-2 border-black">
                                    <thead>
                                        <tr className='border-2 border-black'>
                                            <th className='border-2 border-black p-2'>ProcessName</th>
                                            <th className='border-2 border-black p-2'>I/O Time</th>
                                            <th className='border-2 border-black p-2'>Respon Time</th>
                                            <th className='border-2 border-black p-2'>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {deviceList.map((item, index) => (
                                            <tr key={index} className={`text-sm ${item.status === "Running" ? 'bg-green-300' : ''}
                                                                        ${item.status === "Waiting" ? 'bg-orange-300' : ''} `}>
                                                <td className='border-2 border-black p-2 '>{item.processName}</td>
                                                <td className='border-2 border-black p-2 '>{item.RunTime}</td>
                                                <td className='border-2 border-black p-2 '>{item.ResponTime}</td>
                                                <td className='border-2 border-black p-2 '>{item.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            </div>
            <div className='mr-[6%] ml-10 mb-10'>
                <div className="mt-10  w-full shadow-2xl">
                    <div className="bg-red-400 rounded-t-2xl h-20">
                        <div className="ml-10 text-2xl h-full flex justify-start items-center font-bold">
                            <h1>Terminate</h1>
                        </div>
                    </div>
                    <div className="h-60 bg-yellow-200 overflow-y-scroll">
                        <table className="w-full border-2 border-black">
                            <thead>
                                <tr className='border-2 border-black'>
                                    <th className='border-2 border-black p-5'>ProcessName</th>
                                    <th className='border-2 border-black p-5'>Arrival Time</th>
                                    <th className='border-2 border-black p-5'>Quantum Time</th>
                                    <th className='border-2 border-black p-5'>Burst Time</th>
                                    <th className='border-2 border-black p-5'>Waiting Time</th>
                                    <th className='border-2 border-black p-5'>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {terminateList.map((item, index) => (
                                    <tr key={index} className={`text-sm ${item.status === "Terminate" ? 'bg-red-300' : ''} `}>
                                        <td className='border-2 border-black p-2'>{item.processName}</td>
                                        <td className='border-2 border-black p-2'>{item.arrivalTime}</td>
                                        <td className='border-2 border-black p-2'>{item.quantumTime}</td>
                                        <td className='border-2 border-black p-2'>{item.burstTime}</td>
                                        <td className='border-2 border-black p-2'>{item.waitingTime}</td>
                                        <td className='border-2 border-black p-2'>{item.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default View