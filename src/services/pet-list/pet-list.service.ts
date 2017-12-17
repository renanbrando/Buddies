import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Pet } from "../../models/Pet";

@Injectable()
export class PetListService{

    private petListRef = this.db.list<Pet>('pet-list');

    constructor(private db: AngularFireDatabase){
    }

    getPetsByUser(user: string){
        let pets = this.db.list<Pet>('pet-list', ref => ref.orderByChild('owner_id').equalTo(user));
        console.log(pets);
        return pets;
    }

    getPetList(){
        return this.petListRef;
    }

    addPet(pet: Pet){
        return this.petListRef.push(pet);
    }

    editPet(pet: Pet){
        return this.petListRef.update(pet.key, pet);
    }

    removePet(pet: Pet){
        return this.petListRef.remove(pet.key);
    }

    removeAll(){
        return this.petListRef.remove();
    }
}