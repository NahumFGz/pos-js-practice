import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from './entities/product.entity'
import { FindManyOptions, Repository } from 'typeorm'
import { Category } from '../categories/entities/category.entity'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const category = await this.categoryRepository.findOneBy({
      id: createProductDto.categoryId,
    })

    if (!category) {
      const errors: string[] = []
      errors.push('La categoría no existe')
      throw new NotFoundException(errors)
    }

    return await this.productRepository.save({
      ...createProductDto,
      category,
    })
  }

  async findAll(categoryId: number, take: number, skip: number) {
    //Si el eager está activo se puede deshabilitar aqui con loadEagerRelations: false
    const options: FindManyOptions<Product> = {
      relations: {
        category: true,
      },
      order: {
        id: 'DESC',
      },
      take: take,
      skip: skip,
    }

    if (categoryId) {
      options.where = {
        category: {
          id: categoryId,
        },
      }
    }

    const [products, total] = await this.productRepository.findAndCount(options)

    return {
      products,
      total,
    }
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: {
        category: true,
      },
    })

    if (!product) {
      throw new NotFoundException(`El producto id: ${id} no fue encontrado`)
    }

    return product
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id)
    //! Mutamos lo q retorna findOne para poder guardarlo en la bd
    Object.assign(product, updateProductDto)

    //! Para actualizar las relaciones, se valida  si existe antes de guardar
    if (updateProductDto.categoryId) {
      const category = await this.categoryRepository.findOneBy({
        id: updateProductDto.categoryId,
      })

      if (!category) {
        const errors: string[] = []
        errors.push('La categoría no existe')
        throw new NotFoundException(errors)
      }
    }

    return await this.productRepository.save(product)
  }

  async remove(id: number) {
    const product = await this.findOne(id)
    await this.productRepository.remove(product)

    return `Producto eliminado`
  }
}
