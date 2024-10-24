import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ExampleResponseDto {
  @Expose({ name: '_id' })
  id: string;

  @Expose()
  name: string;

  @Expose()
  age: number;
}
