import { useParams } from "react-router-dom"
import Navigation from "../components/Navigation"

const RecipeModify = () => {

    const params= useParams()
    
    return(
        <div>
            <Navigation/>
            <h2>RecipeModify Page {params.id}</h2>
        </div>
    )

}

export default RecipeModify