

const Home = () => {
    const handledLogout = async (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        window.location.href = "/login";
    }
    return (
        <button type="button" onClick={handledLogout} className="bg-slate-500">Logout</button>
    )

}

export default Home;