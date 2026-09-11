import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

const ProtectedRoute = ({ children}) =>{
    const { isAuthenticated, checking} = useAuth();

    if(checking){
        return <p className="text-sm text-muted p-11">Checking session....</p>
    }
    if(!isAuthenticated){
        return <Navigate to="/" replace/>
    }

    return children
};

export default ProtectedRoute