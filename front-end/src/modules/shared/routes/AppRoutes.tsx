import { Route, Routes } from "react-router-dom";
import Login from "../../user/pages/Login";
import Register from "../../user/pages/Register";
import Home from "../../notes/pages/Home";
import UploadNotes from "@/modules/notes/pages/UploadNotes";
import ErrorPage from "../../notes/pages/404Page";

const AppRoutes=()=>{
    return(
        <>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                {/* New */}
                <Route path="/upload" element={<UploadNotes/>}/>
                {/* New */}
                <Route path="/" element={<Home/>}/>
                <Route path="*" element={<ErrorPage/>}/>
            </Routes>
        </>
    )
}
export default AppRoutes;