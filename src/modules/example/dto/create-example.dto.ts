import { createZodDto, zodToOpenAPI } from 'nestjs-zod';
import { z } from 'zod';

export const CreateExampleSchema = z.object({
  name: z.string(),
  age: z.number().positive().int().min(18).max(100),
});

// class is required for using DTO as a type
export class CreateExampleDto extends createZodDto(CreateExampleSchema) {}
// const CreateExampleDtoOpenApi = zodToOpenAPI(CreateExampleSchema);
// console.warn("🚀 ~ [10]: create-example.dto.ts:11: CreateExampleDtoOpenApi=", CreateExampleDtoOpenApi);

