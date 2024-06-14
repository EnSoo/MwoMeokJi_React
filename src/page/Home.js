import { Link } from "react-router-dom"
import Navigation from "../components/Navigation"

const Home = () => {
    return(
        <div>
            <Navigation/>
            <h2>Home Page</h2>
            <Link to='/map'>맵</Link><br></br>
            <Link to='/recipe'>레시피</Link>
        </div>
    )
}

export default Home