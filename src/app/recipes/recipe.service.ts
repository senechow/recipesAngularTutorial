import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

	recipeSelected = new EventEmitter<Recipe>();

	private recipes: Recipe[] = [
		new Recipe(
			'Pizza', 
			'Tasty pizza', 
			'https://www.cicis.com/media/1176/pizza_trad_pepperonibeef.png',
			[
				new Ingredient('Meat', 1),
				new Ingredient('Dough', 10)
			]),
		new Recipe(
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

	addIngredientsToShoppingList(ingredients: Ingredient[]) {
		this.shoppingListService.addIngredients(ingredients);
	}

}