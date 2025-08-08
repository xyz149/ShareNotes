import { useNavigate } from "react-router-dom"

const Home=()=>{
    const navigate = useNavigate();
    return(
        <div className="home-wrapper d-flex align-items-center justify-content-center text-center">
            <div className="content-box p-4 rounded shadow-lg bg-white ">
                <h1 className="display-4 fw-bold">Welcome to ShareNotes</h1>
                <p className="lead">Your one-stop platform to share and access study notes easily.</p>
                <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
                    <button className="custom-login-btn" onClick={() => navigate('/login')}>Login</button>
                    <button className="custom-register-btn" onClick={() => navigate('/register')}>Register</button>
                </div>
            </div>
        </div>
    )
}
export default Home;