import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header=()=>{
    return(
        <header className="w-full shadow-md bg-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between py-3 px-4">
            {/* Logo on the left */}
            <Link
            to="/"
            className="text-xl font-bold text-purple-700 tracking-wide flex items-center gap-1 no-underline"
            >
            {/* SVG */}
            <svg
                width="140"
                height="110"
                viewBox="0 0 140 110"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="inline-block"
            >
                <rect
                x="30"
                y="30"
                width="50"
                height="60"
                rx="6"
                fill="#E0E7FF"
                stroke="#4F46E5"
                strokeWidth="2"
                />
                <rect
                x="40"
                y="40"
                width="50"
                height="60"
                rx="6"
                fill="#FFFFFF"
                stroke="#4F46E5"
                strokeWidth="2"
                />
                <line
                x1="50"
                y1="50"
                x2="80"
                y2="50"
                stroke="#4F46E5"
                strokeWidth="1.5"
                />
                <line
                x1="50"
                y1="58"
                x2="80"
                y2="58"
                stroke="#4F46E5"
                strokeWidth="1.5"
                />
                <line
                x1="50"
                y1="66"
                x2="80"
                y2="66"
                stroke="#4F46E5"
                strokeWidth="1.5"
                />
                <line
                x1="50"
                y1="74"
                x2="80"
                y2="74"
                stroke="#4F46E5"
                strokeWidth="1.5"
                />
                <circle cx="90" cy="38" r="2" fill="#4F46E5" />
                <g transform="rotate(30, 90, 38)" stroke="#4F46E5" strokeWidth="3" fill="none">
                <path d="M78 30a16 16 0 0 1 24 0" />
                <path d="M70 22a28 28 0 0 1 40 0" />
                <path d="M62 14a40 40 0 0 1 56 0" />
                </g>
            </svg>
            ShareNotes
            </Link>
            <nav className="flex gap-4">
            <Button variant="default" className="text-white" asChild>
                <Link to="/login" style={{ textDecoration: "none" }}>
                Login
                </Link>
            </Button>
            <Button variant="default" className="text-white" asChild>
                <Link to="/register" style={{ textDecoration: "none" }}>
                Register
                </Link>
            </Button>
            </nav>
        </div>
        </header>
    )
}
export default Header;