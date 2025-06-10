import React from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"
import { getRecipeFromMistral } from "../ai"

export default function Main() {
    const [ingredients, setIngredients] = React.useState(
        ["all the main spices", "pasta", "ground beef", "tomato paste"]
    )
    const [recipeShown, setRecipeShown] = React.useState(false)

    const [recipeMistral, setRecipeMistral] = React.useState("")

    function toggleRecipeAndGetAI() {
        setRecipeShown(prevShown => !prevShown)
        getRecipeFromMistral(ingredients).then(output => {
            setRecipeMistral(output)
        })
        console.log("loading")
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    ingredients={ingredients}
                    toggleRecipeShown={toggleRecipeAndGetAI}
                />
            }

            {recipeShown && <ClaudeRecipe recipeOutput={recipeMistral}/>}
        </main>
    )
}