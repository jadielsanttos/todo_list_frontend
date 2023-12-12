type Props = {
    widthProgressBar: number,
    setWidthProgressBar: (newWidthProgressBar: number) => void,
}

export const data = {
    updateWidthProgressBar: ({widthProgressBar, setWidthProgressBar}: Props) => {
        let newWidthProgressBar = widthProgressBar

        setInterval(() => {
            if(newWidthProgressBar < 100) {
                setWidthProgressBar(newWidthProgressBar += 10)
            }
        }, 100)
    }
}