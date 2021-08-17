import { Link } from "react-router-dom";

function MoodleRequest() {
    return <div style={{margin:"15px",textAlign:"center",fontSize:"18px"}}>Vui lòng <Link style={{color:"#18468b",fontWeight:600}} to="/setting">kết nối Moodle</Link> để sử dụng chức năng này</div>
}

export default MoodleRequest;