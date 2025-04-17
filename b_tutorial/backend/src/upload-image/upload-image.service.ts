/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common'
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryResponse } from './upload-image.response'
import streamifier from 'streamifier'

@Injectable()
export class UploadImageService {
  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          // ✅ Cambio 1: Asegurarse de que el rechazo use una instancia de Error
          // Cloudinary puede retornar un objeto plano, lo cual viola la regla eslint@typescript-eslint/prefer-promise-reject-errors
          if (error) {
            return reject(
              new Error(error.message || 'Upload to Cloudinary failed'),
            )
          }

          // ✅ Cambio 2: Validación adicional en caso el resultado sea undefined
          // Esto evita un error de tipo en TypeScript ya que `result` podría ser undefined
          if (!result) {
            return reject(new Error('No result returned from Cloudinary'))
          }

          // ✅ Si todo está bien, se resuelve con el resultado
          resolve(result)
        },
      )

      // ✅ Convertimos el buffer del archivo en un stream legible y lo conectamos al stream de Cloudinary
      streamifier.createReadStream(file.buffer).pipe(uploadStream)
    })
  }
}
