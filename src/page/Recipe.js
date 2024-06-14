import { useState, useEffect } from "react"
import Papa from 'papaparse'
import Navigation from "../components/Navigation"
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Recipe = () => {
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('/recipe.csv')
            .then(response => response.text())
            .then(csv => {
                Papa.parse(csv, {
                    header: true,
                    complete: (results) => {
                        setRecipes(results.data)
                        console.log("recipe", recipes)
                        setLoading(false)
                    }
                })
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div>
            <Navigation />
            <h2>Recipe Page</h2>
            <Grid>
                {recipes.map((recipe, index) => (
                    <StyledLink to={`/recipe/detail/${index}`} key={index} className="recipe-link">
                        <Card>
                            <Image src={`${process.env.PUBLIC_URL}/imgs/${recipe.Name}.jpg`} alt={recipe.Name} />
                            <TextContainer>
                                {recipe.Name}
                            </TextContainer>
                        </Card>
                    </StyledLink>
                ))}
            </Grid>
        </div>
    )
}

export default Recipe;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
    padding: 2rem;
`

const Card = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    background-color: white;
    border: 1px solid black;
    margin: 1rem 1rem auto auto;
    color: black;
    font-size: 14px;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

const Image = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 8px;
    margin-right: 1rem;
`

const TextContainer = styled.div`
    text-align: left;   
`
const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    display: block;

    &:hover {
        text-decoration: none;
    }

    & > ${Card} {
        cursor: pointer;
    }
`





