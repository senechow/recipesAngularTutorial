import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core'

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
	'selector': 'app-shopping-list-edit',
	'templateUrl': './shopping-list-edit.component.html',
	'styleUrls': [
		'./shopping-list-edit.component.css'
	]
})
export class ShoppingListEditComponent {

	@ViewChild('nameInput') nameInput : ElementRef;
	@ViewChild('amountInput') amountInput : ElementRef;

	constructor(private shoppingListService : ShoppingListService) {

	}

	addIngredientToShoppingCart() {
		const name = this.nameInput.nativeElement.value;
		const amount =  this.amountInput.nativeElement.value;
		this.shoppingListService.addIngredient(new Ingredient(name, amount));
	}

	deleteShoppingCart() {
		this.shoppingListService.clearIngredients();
	}

}