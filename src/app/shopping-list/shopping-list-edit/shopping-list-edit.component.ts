import { Component, ViewChild, ElementRef, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core'
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
	'selector': 'app-shopping-list-edit',
	'templateUrl': './shopping-list-edit.component.html',
	'styleUrls': [
		'./shopping-list-edit.component.css'
	]
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

	subscription: Subscription;
	@ViewChild('ingredientForm') ingredientForm: NgForm;
	editMode = false;
	editedItemIndex : number;
	editedItem: Ingredient;

	constructor(private shoppingListService : ShoppingListService) {

	}

	ngOnInit() {
		this.subscription = this.shoppingListService.startedEditing.subscribe(
			(index: number) => {
				this.editMode = true;
				this.editedItemIndex = index;
				this.editedItem = this.shoppingListService.getIngredient(index);
				this.ingredientForm.setValue({
					ingredientName: this.editedItem.name,
					ingredientAmount: this.editedItem.amount
				});
			}
		);
	}

	submitIngredientForm() {
		const name = this.ingredientForm.value.ingredientName;
		const amount = this.ingredientForm.value.ingredientAmount;
		const newIngredient = new Ingredient(name, amount);
		if(this.editMode) {
			this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
		} else {
			this.shoppingListService.addIngredient(newIngredient);
		}
		this.clearIngredientForm();
	}

	deleteIngredient() {
		this.shoppingListService.deleteIngredient(this.editedItemIndex);
		this.clearIngredientForm();
	}

	clearIngredientForm() {
		this.editMode = false;
		this.ingredientForm.reset();
	}

	ngOnDestroy(){
		this.subscription.unsubscribe();
	}

}