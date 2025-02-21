import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function RequireAuth({ allowedRoles }) {
    const { isLoggedIn, role } = useSelector((state) => state.auth);

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/denied" />;
    }

    return <Outlet />;
}

export default RequireAuth;

// import { useSelector } from "react-redux";
// import { Navigate, Outlet } from "react-router-dom";

// function RequireAuth({ allowedRoles }) {
//     const { isLoggedIn, role } = useSelector((state) => state.auth);

//     return isLoggedIn && allowedRoles.find((myRole) => myRole == role) ? (
//         <Outlet/>
//     ) : isLoggedIn ? ( <Navigate to="/denied"/>) : (<Navigate to="login" />)
// }

// export default RequireAuth;


// import { useSelector } from "react-redux";
// import { Navigate, Outlet } from "react-router-dom";

// function RequireAuth({allowedRoles}){
//     const { isLoggedIn , role  }= useSelector((state)=>state.auth);

//     return isLoggedIn && allowedRoles.find((myRole)=>myRole ==role ) ? (
//         <Outlet/>
//     ): isLoggedIn ?(
//         <Navigate to="/denied"/>
//     ):(
//         <Navigate to="login"/>
//     )
// }
// export default RequireAuth;