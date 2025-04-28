// Clase Receta
class Recipe {
    constructor(id, name, ingredients, instructions, prepTime, portions, category, difficulty) {
        this.id = id;
        this.name = name;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.prepTime = prepTime;
        this.portions = portions;
        this.category = category;
        this.difficulty = difficulty;
    }
}

// Clase Recetario
class RecipeApp {
    constructor() {
        this.recipes = [];
        this.loadRecipes();
        this.initElements();
        this.bindEvents();
        this.renderRecipes();
    }

    // Inicializar elementos del DOM
    initElements() {
        this.recipesContainer = document.getElementById('recipesContainer');
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.categoryFilter = document.getElementById('categoryFilter');
        this.difficultyFilter = document.getElementById('difficultyFilter');
        this.addRecipeBtn = document.getElementById('addRecipeBtn');
        this.recipeModal = document.getElementById('recipeModal');
        this.modalTitle = document.getElementById('modalTitle');
        this.recipeForm = document.getElementById('recipeForm');
        this.closeModal = document.querySelector('.close');
        this.recipeIdInput = document.getElementById('recipeId');
    }

    // Vincular eventos
    bindEvents() {
        this.addRecipeBtn.addEventListener('click', () => this.openModal());
        this.closeModal.addEventListener('click', () => this.closeModalWindow());
        window.addEventListener('click', (e) => {
            if (e.target === this.recipeModal) {
                this.closeModalWindow();
            }
        });
        this.recipeForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        this.searchBtn.addEventListener('click', () => this.renderRecipes());
        this.searchInput.addEventListener('input', () => this.renderRecipes());
        this.categoryFilter.addEventListener('change', () => this.renderRecipes());
        this.difficultyFilter.addEventListener('change', () => this.renderRecipes());
    }

    // Cargar recetas desde localStorage
    loadRecipes() {
        const savedRecipes = localStorage.getItem('recipes');
        if (savedRecipes) {
            this.recipes = JSON.parse(savedRecipes).map(recipe => new Recipe(
                recipe.id,
                recipe.name,
                recipe.ingredients,
                recipe.instructions,
                recipe.prepTime,
                recipe.portions,
                recipe.category,
                recipe.difficulty
            ));
        }
    }

    // Guardar recetas en localStorage
    saveRecipes() {
        localStorage.setItem('recipes', JSON.stringify(this.recipes));
    }

    // Abrir modal para añadir/editar receta
    openModal(recipe = null) {
        if (recipe) {
            this.modalTitle.textContent = 'Editar Receta';
            this.recipeIdInput.value = recipe.id;
            document.getElementById('recipeName').value = recipe.name;
            document.getElementById('ingredients').value = recipe.ingredients.join(', ');
            document.getElementById('instructions').value = recipe.instructions;
            document.getElementById('prepTime').value = recipe.prepTime;
            document.getElementById('portions').value = recipe.portions;
            document.getElementById('category').value = recipe.category;
            document.getElementById('difficulty').value = recipe.difficulty;
        } else {
            this.modalTitle.textContent = 'Nueva Receta';
            this.recipeForm.reset();
            this.recipeIdInput.value = '';
        }
        this.recipeModal.style.display = 'block';
    }

    // Cerrar modal
    closeModalWindow() {
        this.recipeModal.style.display = 'none';
    }

    // Manejar envío del formulario
    handleFormSubmit(e) {
        e.preventDefault();
        
        const id = this.recipeIdInput.value || Date.now();
        const name = document.getElementById('recipeName').value.trim();
        const ingredients = document.getElementById('ingredients').value
            .split(',')
            .map(ing => ing.trim())
            .filter(ing => ing);
        const instructions = document.getElementById('instructions').value.trim();
        const prepTime = parseInt(document.getElementById('prepTime').value);
        const portions = parseInt(document.getElementById('portions').value);
        const category = document.getElementById('category').value;
        const difficulty = document.getElementById('difficulty').value;

        // Validaciones
        if (!name || !ingredients.length || !instructions || !prepTime || !portions || !category || !difficulty) {
            alert('Por favor complete todos los campos obligatorios');
            return;
        }

        if (prepTime <= 0 || portions <= 0) {
            alert('El tiempo de preparación y las porciones deben ser números positivos');
            return;
        }

        const recipeData = new Recipe(
            id,
            name,
            ingredients,
            instructions,
            prepTime,
            portions,
            category,
            difficulty
        );

        if (this.recipeIdInput.value) {
            // Editar receta existente
            const index = this.recipes.findIndex(r => r.id == id);
            if (index !== -1) {
                this.recipes[index] = recipeData;
            }
        } else {
            // Añadir nueva receta
            this.recipes.push(recipeData);
        }

        this.saveRecipes();
        this.renderRecipes();
        this.closeModalWindow();
    }

    // Eliminar receta
    deleteRecipe(id) {
        if (confirm('¿Estás seguro de que quieres eliminar esta receta?')) {
            this.recipes = this.recipes.filter(recipe => recipe.id != id);
            this.saveRecipes();
            this.renderRecipes();
        }
    }

    // Filtrar recetas
    getFilteredRecipes() {
        const searchTerm = this.searchInput.value.toLowerCase();
        const categoryFilter = this.categoryFilter.value;
        const difficultyFilter = this.difficultyFilter.value;

        return this.recipes.filter(recipe => {
            const matchesSearch = recipe.name.toLowerCase().includes(searchTerm);
            const matchesCategory = categoryFilter ? recipe.category === categoryFilter : true;
            const matchesDifficulty = difficultyFilter ? recipe.difficulty === difficultyFilter : true;
            
            return matchesSearch && matchesCategory && matchesDifficulty;
        });
    }

    // Renderizar recetas en el DOM
    renderRecipes() {
        const filteredRecipes = this.getFilteredRecipes();
        
        if (filteredRecipes.length === 0) {
            this.recipesContainer.innerHTML = '<p class="no-recipes">No se encontraron recetas. ¡Añade una nueva!</p>';
            return;
        }

        this.recipesContainer.innerHTML = '';
        
        filteredRecipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card';
            
            recipeCard.innerHTML = `
                <div class="recipe-header">
                    <h3>${recipe.name}</h3>
                    <div class="recipe-meta">
                        <span>${recipe.category}</span>
                        <span>${recipe.difficulty}</span>
                    </div>
                </div>
                <div class="recipe-body">
                    <div class="recipe-meta">
                        <span>⏱️ ${recipe.prepTime} min</span>
                        <span>🍽️ ${recipe.portions} porciones</span>
                    </div>
                    
                    <div class="recipe-ingredients">
                        <h4>Ingredientes:</h4>
                        <ul>
                            ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="recipe-instructions">
                        <h4>Instrucciones:</h4>
                        <p>${recipe.instructions}</p>
                    </div>
                    
                    <div class="recipe-actions">
                        <button class="btn-edit edit-recipe" data-id="${recipe.id}">Editar</button>
                        <button class="btn-danger delete-recipe" data-id="${recipe.id}">Eliminar</button>
                    </div>
                </div>
            `;
            
            this.recipesContainer.appendChild(recipeCard);
        });

        // Agregar eventos a los botones de editar y eliminar
        document.querySelectorAll('.edit-recipe').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const recipe = this.recipes.find(r => r.id == id);
                if (recipe) this.openModal(recipe);
            });
        });

        document.querySelectorAll('.delete-recipe').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                this.deleteRecipe(id);
            });
        });
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new RecipeApp();
});