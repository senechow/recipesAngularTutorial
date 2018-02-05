import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {

	private serverUrl: string = "https://udemy-angular-tutorial-a98b1.firebaseio.com/data.json";

	constructor(private http : Http,
				private recipeService: RecipeService,
				private authService : AuthService) {

	}

	putRecipesToServer() {
		const token = this.authService.getToken();
		return this.http.put(this.serverUrl + "?auth=" + token, this.recipeService.getRecipes());
	}

	fetchRecipesFromServer() {
		const token = this.authService.getToken();

		this.authService.getToken();

		return this.http.get(this.serverUrl + "?auth=" + token)
			.map(
				(response: Response) => {
					const recipes = response.json();
					for (let recipe of recipes) {
						if(!recipe.ingredients) {
							console.log(recipe);
							recipe.ingredients = [];
						}
					}
					return recipes;
				}
			)
			.subscribe(
				(recipes: Recipe[]) => {
					this.recipeService.setRecipes(recipes);
				}
			)
	}

}