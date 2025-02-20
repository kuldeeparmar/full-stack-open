import StatisticsLine from "./StatisticsLine"

const Statistics = (props) => {
    const {good,bad,neutral} = props

    if(good + bad + neutral == 0){
        return (
            <div>
                No Feedback Given.
            </div>
        )
    }

    const total = () => {
        return (good + bad + neutral);
    }

    const average = () => {
        if(total() == 0) 
            return 0


        return (good - bad )/total();
    }

    const positive = () => {

        if(bad + neutral == 0) 
            return 100;
        

        return (
            good / total() * 100 
        )
    }

    return (
        <div>
            <table>
                <tbody>
                <StatisticsLine text="good" value={good} />
                <StatisticsLine text="bad" value={bad} />
                <StatisticsLine text="neutral" value={neutral} />
                <StatisticsLine text="all" value={total()} />
                <StatisticsLine text="average" value={average()} />
                <StatisticsLine text="positive" value={positive() + "%"} />
                </tbody>
            </table>
        </div>
    )
}

export default Statistics;