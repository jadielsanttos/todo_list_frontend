import moment from "moment"

type Props = {
    widthProgressBar: number,
    setWidthProgressBar: (newWidthProgressBar: number) => void,
}

type CalculateDate = {
    updated_at: Date,
    setMsgUpdatedAt: (msgUpdatedAt: string) => void
}

export const data = {
    updateWidthProgressBar: ({widthProgressBar, setWidthProgressBar}: Props) => {
        let newWidthProgressBar = widthProgressBar

        setInterval(() => {
            if(newWidthProgressBar < 100) {
                setWidthProgressBar(newWidthProgressBar += 10)
            }
        }, 100)
    },
    calculateDiffBetweenDates: ({updated_at, setMsgUpdatedAt}: CalculateDate): boolean => {
        const targetDate = new Date(updated_at).toLocaleString('pt-BR', {timeZone: 'UTC'})
        const currentDate = new Date().toLocaleString('pt-BR', {timeZone: 'UTC'})
        const difference = moment(targetDate, "DD/MM/YYYY HH:mm:ss").diff(moment(currentDate, "DD/MM/YYYY HH:mm:ss"))
        
        const minutes = Math.abs(Math.round(moment.duration(difference).asMinutes()))
        const hours = Math.abs(Math.round(moment.duration(difference).asHours()))
        const days = Math.abs(Math.round(moment.duration(difference).asDays()))

        if(minutes > 0 && minutes < 60) {
            setMsgUpdatedAt(`Editado há ${minutes}m atrás`)
            return true
        }

        if(hours > 0 && hours <= 24) {
            setMsgUpdatedAt(`Editado há ${hours}h atrás`)
            return true
        }

        if(days > 0) {
            setMsgUpdatedAt(`Editado há ${days}d atrás`)
            return true
        }

        return false
    }
}