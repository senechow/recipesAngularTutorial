import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

	private recipes: Recipe[] = [
		new Recipe(
			1,
			'Pizza', 
			'Tasty pizza', 
			'https://www.cicis.com/media/1176/pizza_trad_pepperonibeef.png',
			[
				new Ingredient('Meat', 1),
				new Ingredient('Dough', 10)
			]),
		new Recipe(
			2,
			'Hamburger', 
			'Who wants a burger!', 
			'https://www.yummy.co.ke/wp-content/uploads/2013/05/burgerP.jpg',
			[
				new Ingredient('Meat', 1),
				new Ingredient('Buns', 2)
			])
	];

	constructor(private shoppingListService : ShoppingListService){}

	getRecipes() {
		return this.recipes.slice(); //Returns a copy of the original recipes.
	}

	getRecipe(id : number) {
		for(let i = 0; i < this.recipes.length; i++) {
			if(this.recipes[i].id === id) return this.recipes[i];
		}
	}

	addIngredientsToShoppingList(ingredients: Ingredient[]) {
		this.shoppingListService.addIngredients(ingredients);
	}

}