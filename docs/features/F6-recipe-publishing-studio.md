# F6: Interactive Recipe Publishing & Creation Studio

## Overview
A dynamic multi-field form studio allowing authenticated culinary chefs to draft, validate, and publish custom culinary recipes with interactive ingredient list builders, step reordering, and instant client-side preview.

## Architectural Flow
```mermaid
flowchart TD
    ChefAction[Chef Enters Recipe Form] --> FormState[RecipeForm.jsx Controlled State]
    FormState --> InputText[Title, Cooking Time, Difficulty Inputs]
    FormState --> IngredientBuilder[Dynamic Add/Remove Ingredient Rows]
    IngredientBuilder --> ArrayMutation[Immutably Append/Filter Ingredient Arrays]
    FormState --> StepBuilder[Preparation Step Sequence Builder]
    FormState --> ValidationCheck{Validate Required Fields & Formats}
    ValidationCheck -->|Fail| DisplayErrors[Highlight Incomplete Fields Inline]
    ValidationCheck -->|Pass| SubmitHandler[Create Recipe Object & Append to Collection]
```

## Sequence Diagram
```mermaid
sequenceDiagram
    autonumber
    actor Chef as Executive Chef
    participant Studio as Recipe Form (create.jsx / recipeform.jsx)
    participant State as Local Form State (useState)
    participant Store as Global Recipe List
    participant Router as React Router

    Chef->>Studio: Types recipe title and prep metrics
    Studio->>State: Update form values via controlled handlers
    Chef->>Studio: Clicks 'Add Ingredient'
    Studio->>State: setIngredients([...prev, { name: '', quantity: '' }])
    Chef->>Studio: Submits completed recipe form
    Studio->>Studio: Run client-side field validation
    Studio->>Store: Append new recipe object with generated UUID
    Studio->>Router: Redirect to new recipe detail view (/recipe/:id)
```

## Failure Path Diagram
```mermaid
flowchart TD
    ValidationError[Empty Title or Zero Ingredients on Submit] --> InterceptSubmit[e.preventDefault & Form Validation]
    InterceptSubmit --> ShowToast[Render Error Banner: 'Please add at least 1 ingredient']
    ShowToast --> FocusError[Scroll & Focus First Invalid Input]
```

## Technical Implementation
- **File**: `src/views/create.jsx`, `src/components/recipeform.jsx`
- **State Pattern**: Controlled React inputs with immutable array operations for dynamic step and ingredient rows (`[...items, newItem]`).
- **Data Model**: Structured recipe schema containing `id`, `title`, `author`, `prepTime`, `cookTime`, `ingredients[]`, `steps[]`, and `category`.

## Say It Out Loud
I engineered the recipe creation studio as an interactive form workspace where chefs can compose complex culinary recipes with dynamic lists of ingredients and cooking steps. As the chef drafts their dish, the component maintains controlled state for nested arrays, allowing items to be added, edited, or removed immutably without side effects. I implemented standard React controlled components rather than an external form library because the schema requirements were straightforward and maintaining native React state kept our bundle lean without adding third-party dependencies. If a user attempts to submit the form without entering required details like cooking duration or at least one ingredient, the validation handler halts submission, focuses the invalid field, and displays a clean error toast. In the future, I plan to integrate drag-and-drop step reordering using Pragmatic Drag and Drop or Framer Motion to make rearranging culinary steps even more intuitive.\n