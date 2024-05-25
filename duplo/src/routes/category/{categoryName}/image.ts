import { categoryExistCheck, inputCategory } from "@checkers/category";
import { hasPrimordialRole } from "@security/hasPrimordialRole";
import { S3Service } from "@services/S3";
import { extname } from "path";

/* METHOD : PUT, PATH : /category/{categoryName}/image */
export const PUT = (method: Methods, path: string) => 
	hasPrimordialRole({ options: { primordialRole: "CONTENTS_MASTER" } })
		.declareRoute(method, path)
		.extract({
			params: {
				categoryName: zod.string()
			}
		})
		.check(
			categoryExistCheck,
			{
				input: p => inputCategory.name(p("categoryName")),
				...categoryExistCheck.preCompletions.mustExist,
			},
			new IHaveSentThis(NotFoundHttpException.code, "category.notfound")
		)
		.process(
			...multipart({
				files: {
					image: {
						max: 1,
						mimeType: ["image/jpeg", "image/png"]
					}
				}
			})
		)
		.cut(
			({ pickup }) => {
				const { image } = pickup("multipartGetFile");
				const categoryImage = image[0];

				if (!categoryImage) {
					throw new BadRequestHttpException("category.image.missing");
				}

				return {
					categoryImage
				};
			},
			["categoryImage"],
			new IHaveSentThis(BadRequestHttpException.code, "category.image.missing")
		)
		.handler(
			async ({ pickup }) => {
				const categoryImage = pickup("categoryImage");
				const { id: categorieId, imageKey: oldImageKey } = pickup("category");
				const newImageKey = `/category/${categorieId}-${Date.now()}${extname(categoryImage.properties.filename)}`;

				if (oldImageKey) {
					await S3Service.delete(ENV.MINIO_BUCKET_CONTENT, oldImageKey);
				}

				await S3Service.post(ENV.MINIO_BUCKET_CONTENT, newImageKey, categoryImage.tempFileName);

				await prisma.category.update({
					where: {
						id: categorieId
					},
					data: {
						imageKey: newImageKey,
						imageUrl: `/${ENV.MINIO_PREFIX}/${ENV.MINIO_BUCKET_CONTENT}${newImageKey}`
					}
				});

				throw new NoContentHttpException("category.image.updated");
			},
			new IHaveSentThis(NoContentHttpException.code, "category.image.updated")
		);
