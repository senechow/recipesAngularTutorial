import { Subject } from 'rxjs/Subject';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {

	ingredientChanged = new Subject<Ingredient[]>();
	startedEditing = new Subject<number>();

	private ingredients : Ingredient[] = [
		new Ingredient('Apples', 5),
		new Ingredient('Tomatatoes', 10)
	];

	getIngredients() {
		return this.ingredients.slice();
	}

	getIngredient(index: number) {
		return this.ingredients[index];
	}

	addIngredient(ingredient : Ingredient) {
		this.ingredients.push(ingredient);
		this.ingredientChanged.next(this.ingredients.slice());
	}

	addIngredients(ingredients : Ingredient[]) {
		//this.ingredients = this.ingredients.concat(ingredients); // concat solution
		this.ingredients.push(...ingredients); //ES 6 solution!
		this.ingredientChanged.next(this.ingredients.slice());
	}

	updateIngredient(index: number, ingredient: Ingredient) {
		this.ingredients[index] = ingredient;
		this.ingredientChanged.next(this.ingredients.slice());
	} 

	deleteIngredient(index: number) {
		this.ingredients.splice(index, 1);
		this.ingredientChanged.next(this.ingredients.slice());
	}

}