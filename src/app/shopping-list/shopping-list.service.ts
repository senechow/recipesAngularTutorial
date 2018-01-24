import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {

	ingredientChanged = new EventEmitter<Ingredient[]>();
	private ingredients : Ingredient[] = [
		new Ingredient('Apples', 5),
		new Ingredient('Tomatatoes', 10)
	];

	getIngredients() {
		return this.ingredients.slice();
	}

	addIngredient(ingredient : Ingredient) {
		this.ingredients.push(ingredient);
		this.ingredientChanged.emit(this.ingredients.slice());
	}

	addIngredients(ingredients : Ingredient[]) {
		//this.ingredients = this.ingredients.concat(ingredients); // concat solution
		this.ingredients.push(...ingredients); //ES 6 solution!
		this.ingredientChanged.emit(this.ingredients.slice());
	}

	clearIngredients() {
		this.ingredients = [];
		this.ingredientChanged.emit(this.ingredients.slice());
	}

}