import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

	recipe : Recipe;

  	constructor(
  		private recipeService : RecipeService,
  		private router: Router,
  		private route: ActivatedRoute
  		) { }

 	ngOnInit() {
 		this.route.params.subscribe(
 			(params : Params) => {
 				this.recipe = this.recipeService.getRecipe(+params['id']);
         
 			}
 		);
 	}

 	onClickToShoppingList() {

 		this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);

 	}

 	onEditRecipe() {
 		this.router.navigate(['edit'], {relativeTo: this.route});
 	}

 	 onDelete() {
    	this.recipeService.deleteRecipe(this.recipe.id);
    	this.router.navigate(['../'], {relativeTo: this.route});
  	}

}
