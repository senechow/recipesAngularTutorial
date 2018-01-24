import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

	recipes: Recipe[] = [
		new Recipe('Test Recipe', 'This is a test recipe', 'https://www.cicis.com/media/1176/pizza_trad_pepperonibeef.png'),
		new Recipe('Hamburger', 'Who wants a burger!', 'https://www.yummy.co.ke/wp-content/uploads/2013/05/burgerP.jpg')
	];

  @Output() onRecipeSelected = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit() {
  }	

  clickedRecipe(recipe : Recipe) {
    console.log()
    this.onRecipeSelected.emit(recipe);
  }

}
