import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FirstSign } from "../store/actions/authen";

const backCover = {
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
    position: 'fixed',
    // marginTop: 20,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 3
    // opacity: 0.5,
}

const dialog = {
    display: "fixed",
    background: "white",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    zIndex: "4",
    padding: "30px",
    borderRadius: "7px"
}

function FirsttimeLogin() {

    // const [popup, setPopup] = useState(true)
    const fisrtsign = useSelector(state => state.authen.fisrtsign)
    const dispatch = useDispatch()

    const Firsttime = () => {
        dispatch(FirstSign(false))
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/account/setchangefirst", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    }


    if (fisrtsign === true)
        return <div>
            <div style={backCover} onClick={() => dispatch(FirstSign(false))}></div>
            <div style={dialog}>
                <p style={{ textAlign: "center", fontWeight: "600", fontSize: "20px" }}>Nhắc nhở</p>

                <p style={{ textAlign: "center", fontWeight: "500" }}>Kết nối với Moodle để sử dụng đầy đủ tính năng</p>
                <div className="row" style={{ justifyContent: "space-around" }}>
                    <div type="button" className="col-3" style={{ textAlign: "center", fontWeight: "500", background: "#f1f2f4", color: "rgb(24, 70, 139)", padding: "5px", borderRadius: "2px" }} onClick={() => Firsttime()}>Không</div>
                    <div type="button" className="col-3" style={{ textAlign: "center", fontWeight: "500", background: "white", color: "rgb(24, 70, 139)", padding: "5px", borderRadius: "2px", border: "1px solid rgb(24, 70, 139)" }} onClick={() => dispatch(FirstSign(false))}>Nhắc tôi sau</div>
                    <Link to="/setting" type="button" className="col-3" style={{ textAlign: "center", fontWeight: "500", background: "rgb(24, 70, 139)", color: "white", padding: "5px", borderRadius: "2px" }} onClick={() => Firsttime()}>Kết nối ngay</Link>

                </div>
            </div>
        </div>
    return null
}

export default FirsttimeLogin;