interface IMaterial{
    id:number
    name:string
}

interface IArchetype{
    id:number
    name:string
}

interface IProduct{
    id: number
    name: string
    weight: number
    price: number
    color: string
    materialId?: string
    material: IMaterial
    archetypeId?: number
    archetype: IArchetype
}

export { IMaterial, IArchetype, IProduct }