import { IProduct } from "./joyaGold.model";


export const reponseToProduct = (response:any) => {

    let material:any = response['material'];
    let archetype:any = response['archetype'];

    let prodcut:IProduct = {
        id: response['id'],
        name: response['name'],
        weight: response['weight'],
        price: response['price'],
        color: response['color'],
        materialId: response['materialId'] || 0,
        material: material,
        archetypeId: response['archetypeId'] || 0,
        archetype: archetype,
    }

    return prodcut;
}