import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {getUserRole} from "../../../service/localstorage";

const StudentRoutes=()=>{

    const navigate=useNavigate();
    useEffect(() => {
        const role=getUserRole();
        if (role!=="STUDENT")
        {
            navigate("/login");
        }
    }, []);

    return <Outlet></Outlet>
}

export default StudentRoutes;