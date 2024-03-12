class RRmodel {
    constructor(processName,arrivalTime,quantumTime,burstTime,waitingTime,status,RunTime,ResponTime){
        this.processName = processName;
        this.arrivalTime = arrivalTime;
        this.quantumTime = quantumTime;
        this.burstTime = burstTime;
        this.waitingTime = waitingTime;
        this.status = status;
        this.RunTime = RunTime;
        this.ResponTime = ResponTime;
    }
}

export default RRmodel;