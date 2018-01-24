import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core'

import { Ingredient }from '../../shared/ingredient.model';

@Component({
	'selector': 'app-shopping-list-edit',
	'templateUrl': './shopping-list-edit.component.html',
	'styleUrls': [
		'./shopping-list-edit.component.css'
	]
})
export class ShoppingListEditComponent {

	@Output() newIngredient = new EventEmitter<Ingredient>();
	@Output() deleteIngredient = new EventEmitter<void>();
	@ViewChild('nameInput') nameInput : ElementRef;
	@ViewChild('amountInput') amountInput : ElementRef;

	addIngredientToShoppingCart() {

		const name = this.nameInput.nativeElement.value;
		const amount =  this.amountInput.nativeElement.value;
		if(name && amount) this.newIngredient.emit(new Ingredient(name, amount));
	}

	deleteShoppingCart() {
		this.deleteIngredient.emit();
	}

}