import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {getUserRole} from "../../../service/localstorage";

const AdminRoutes=()=>{

    const navigate=useNavigate();
    useEffect(() => {
        const role=getUserRole();
        if (role!=="ADMIN")
        {
            navigate("/login");
        }
    }, []);

    return <Outlet></Outlet>
}

export default AdminRoutes;