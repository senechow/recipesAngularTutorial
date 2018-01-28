import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { RecipeService } from '../recipe.service';
import { Ingredient } from '../../shared/ingredient.model';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private recipeService : RecipeService) { }

  ngOnInit() {
  	this.route.params
  		.subscribe(
  			(params: Params) => {
  				this.id = +params['id'];
  				this.editMode = params['id'] != null;
          this.initForm();
  			}
  		);
  }

  onSubmit() {

    const id = this.id ? this.id : null;
    const name = this.recipeForm.value['name'];
    const imagePath = this.recipeForm.value['imagePath'];
    const description = this.recipeForm.value['recipeDescription'];
    const ingredients = this.recipeForm.value['ingredients']
    const recipe = new Recipe(id, name, description, imagePath, ingredients);

    if(this.editMode) {
      this.recipeService.updateRecipe(recipe);
    } else {
      this.recipeService.createRecipe(recipe);
    }

    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/)
          ])
      })
     );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  private initForm() {

    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
               ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'recipeDescription': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

}
