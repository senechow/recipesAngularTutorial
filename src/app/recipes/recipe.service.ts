import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable'; 
import { Subject } from 'rxjs/Subject'; 

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

	recipeChanged = new Subject<Recipe[]>();

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

	private idCounter : number = 2;

	constructor(private shoppingListService : ShoppingListService,
				private http: Http){

	}

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

	createRecipe(recipe : Recipe) {
		recipe.id = ++this.idCounter;
		this.recipes.push(recipe);
		this.recipeChanged.next(this.recipes.slice());
	}

	updateRecipe(recipe: Recipe) {
		for(let i = 0; i < this.recipes.length; i++) {
			if(this.recipes[i].id === recipe.id) {
				this.recipes[i] = recipe;
				break;
			}
		}
		this.recipeChanged.next(this.recipes.slice());
	}

	deleteRecipe(id: number) {
		for(let i = 0; i < this.recipes.length; i++) {
			if(this.recipes[i].id === id) {
				this.recipes.splice(i, 1);
				this.recipeChanged.next(this.recipes.slice());
				break;
			}
		}
	}

	setRecipes(recipes: Recipe[]) {
		this.recipes = recipes;
		this.recipeChanged.next(this.recipes.slice());
	}

}