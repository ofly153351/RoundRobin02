import RRmodel from "../Model/Model";
import { Clock as ClockFunction } from '../Controller/Controller';

class RRController {
    constructor() {
        this.PcbList = [];
        this.TerminateList = [];
        this.DeviceList = [];
        this.ReadyQueue = [];
        this.RunTime = 0;
        this.ResponTime = 0;
        this.countofProcess = 1;
        this.interval = 0;
        this.quantumTime = 10;
        this.waitingTime = 0;
        this.status = "New";
        this.waitingCount = 0;
        this.currentProcessIndex = 0;
        this.currentTime = 0;
        this.countClock = 0;
        this.DeviceStatus = false;
        this.clockIntervalId = ClockFunction(clock => {
            this.clock = clock;
        });
        this.startProcess();
    }

    startProcess() {
        const processInterval = () => {
            this.countClock++;
            this.process();
            // console.log("Ready List : ", this.ReadyQueue);
            setTimeout(processInterval, 1000);
        };
        processInterval();
    }


    addProcess() {
        const processName = "Process" + this.countofProcess;
        const arrivalTime = this.clock;
        const quantumTime = this.quantumTime;
        const burstTime = 0;
        const waitingTime = this.waitingTime;
        const status = this.status;
        const RunTime = this.RunTime;
        const ResponTime = this.ResponTime;
        const newProcess = new RRmodel(
            processName,
            arrivalTime,
            quantumTime,
            burstTime,
            waitingTime,
            status,
            RunTime,
            ResponTime
        );
        this.PcbList.push(newProcess);
        this.countofProcess++;
        setTimeout(() => {
            this.countClock++;
        }, 1000); // 1000 milliseconds = 1 วินาที
        console.log("pcb List :", this.PcbList);
        console.log("Device List : ", this.DeviceList);

    }



    Reset() {
        window.location.reload();
        console.log(1);
    }

    Terminate() {
        if ((this.waitingCount > 0 && this.PcbList.length == 1) || this.PcbList.length <= 0) {
            window.confirm("No Process ! ");
        } else {
            // this.countofProcess--;
            const runningIndex = this.PcbList.findIndex(
                (element) => element.status === "Running");

            if (runningIndex !== -1) {
                const runningProcess = this.PcbList.splice(runningIndex, 1)[0];
                runningProcess.status = "Terminate";
                this.TerminateList.push(runningProcess);
                console.log("Terminate List:", this.TerminateList);
            }
            this.updateReadyQueue();

            // console.log(this.ReadyQueue);
            // this.calculateAvgWaitingTime();
            // this.calculateAVGTurnaround();
        }
    }




    process() {
        const currentProcess = this.PcbList[this.currentProcessIndex];
        if (currentProcess) {
            // เพิ่มเวลาที่กระบวนการทำงาน
            this.currentTime++;
            // ตรวจสอบสถานะของกระบวนการปัจจุบัน
            if (currentProcess.status === "New" && this.PcbList.length === 1) {
                setTimeout(() => {
                    currentProcess.status = "Running";
                }, 200);
            } else if (currentProcess.status !== "Waiting") {
                currentProcess.status = "Running";
                currentProcess.burstTime++;

                const indexInReadQueue = this.ReadyQueue.indexOf(currentProcess);
                if (indexInReadQueue !== -1) {
                    this.ReadyQueue.splice(indexInReadQueue, 1);
                }
            }
            // ตรวจสอบเงื่อนไข Quantum Time
            if (this.currentTime >= this.quantumTime) {
                this.currentProcessIndex = (this.currentProcessIndex + 1) % this.PcbList.length;
                this.currentTime = 0;
                console.log("Running Process Index :" + this.currentProcessIndex);
                // console.log(1%2);
            }
            // กำหนดสถานะและเวลารอสำหรับกระบวนการอื่น ๆ ในรายการ
            this.PcbList.forEach((process, index) => {
                if (index !== this.currentProcessIndex) {
                    if (process.status === "Waiting") {
                        process.waitingTime++;
                    } else {
                        process.status = "Ready";
                        process.waitingTime++;
                    }
                }
            });
            this.updateReadyQueue();
            this.addDevice();
            // ตรวจสอบสถานะของกระบวนการปัจจุบันหลังจากการประมวลผล
            if (this.PcbList[this.currentProcessIndex].status === "Waiting") {
                this.currentProcessIndex = (this.currentProcessIndex + 1) % this.PcbList.length;
                this.currentTime = 0;
            }
        } else {
            // ถ้าไม่มีกระบวนการที่กำลังทำงาน
            this.currentProcessIndex = 0;
        }
    }


    updateReadyQueue() {
        this.PcbList.forEach((process) => {
            if (process.status === "Ready" && !this.ReadyQueue.includes(process)) {
                this.ReadyQueue.push(process);
            }
        });
    }


    addDevice() {
        if (this.DeviceStatus) {
            this.DeviceStatus = false;
            // ค้นหา index ของตัวที่มี statusProcess เป็น "Running" ใน pcbList
            const runningIndex = this.PcbList.findIndex(
                (element) => element.status === "Running"
            );
            if (runningIndex !== -1) {
                // สร้างอ็อบเจกต์ใหม่จากข้อมูลของตัวที่มี statusProcess เป็น "Running"
                const runningProcess = { ...this.PcbList[runningIndex] };
                // เปลี่ยนสถานะเป็น "Waiting" (หรือสถานะที่คุณต้องการ)
                runningProcess.status = "Waiting";
                this.PcbList[runningIndex].status = "Waiting";
                runningProcess.waitingTime = 0;
                runningProcess.burstTime = 0;
                runningProcess.arrivalTime = 0;
                // เพิ่มอ็อบเจกต์ใหม่ลงใน deviceList
                this.DeviceList.push(runningProcess);
            }
        }
            for (let i = 0; i < this.DeviceList.length; i++) {
                this.DeviceList[i].waitingTime++;
        }
    }

    handleAddDevice() {
        if (this.PcbList.length === 0) {
            window.confirm("No Process!!");
        } else {
            this.DeviceStatus = true;
        }
    }

    get TerminateListt() {
        return this.TerminateList
    }

    get DeviceListt() {
        return this.DeviceList
    }
}


export const Clock = (setTime) => {
    let intervalId;
    let clock = 0;
    intervalId = setInterval(() => {
        setTime(clock);
        clock++;
        // console.log("Clock : ", clock);
    }, 1000); // อัพเดท state ของเวลาทุกๆ 1 วินาที
    return intervalId; // คืนค่า intervalId เพื่อให้สามารถ stop interval ได้
}

export default RRController;
