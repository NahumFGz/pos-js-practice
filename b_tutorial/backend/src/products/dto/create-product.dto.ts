import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateProductDto {
  @IsNotEmpty({ message: 'El Nombre del producto es obligatorio' })
  @IsString({ message: 'Nombre no valido' })
  name: string

  @IsNotEmpty({ message: 'El precio del producto es obligatorio' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Precio no valido' })
  price: number

  @IsNotEmpty({ message: 'La cantidad no puede ir vacía' })
  @IsNumber({ maxDecimalPlaces: 0 }, { message: 'Cantidad no valido' })
  inventory: number

  @IsNotEmpty({ message: 'La categoría es obligatoria' })
  @IsInt({ message: 'La categoría no es válida' })
  categoryId: number
}
