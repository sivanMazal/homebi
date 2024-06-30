import { shallowEqual, useSelector } from "react-redux";
import '../../css/navBar.css';
import { useEffect, useState } from "react";

let days_ar = [
    "ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"
]

const AsideNavBar = () => {
    const [now, setNow] = useState(new Date());
    const [timmer, setTimmer] = useState("");
    const [message, setMessage] = useState("");
    let { building, messages } = useSelector(state => {
        return {
            building: state.buildingSlice.building,
            messages: state.buildingSlice.messages,
        }
    }, shallowEqual);

    useEffect(() => {
        clearInterval(timmer);
        setTimmer(setInterval(updateClock, 1000));
    }, []);

    const updateClock = () => {
        setNow(new Date());
    }

    useEffect(() => {
        if (now.getHours() >= 6 && now.getHours() < 12) {
            setMessage("בוקר טוב 🙌");
        } else if (now.getHours() >= 12 && now.getHours() < 16) {
            setMessage("צהריים טובים 🙌");
        } else if (now.getHours() >= 16 && now.getHours() < 18) {
            setMessage("אחר הצהריים טובים 🙌");
        } else {
            setMessage("לילה טוב 🙌");
        }
    }, [])


    return <div className="p-3" style={{ minHeight: "100vh", backgroundColor: "rgb(223, 182, 222)" }}>
        <div>
            {message}
        </div>
        <div>
            <p> יום {days_ar[now.getDay()]}</p>
            {now.toLocaleDateString()} {`${(now.getHours())}`.padStart(2, '0')}:{`${(now.getMinutes())}`.padStart(2, '0')}
        </div>
        {/* <h2 className="my-2">{building.address}</h2> */}
        <div>
            <h4>הודעות לדיירים:</h4>
            <ul className="p-3">
                {messages.map(item => <li key={item._id}>{item.description}</li>)}
            </ul>
        </div>

    </div>
}
export default AsideNavBar;
