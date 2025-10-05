import { IsString, IsOptional } from 'class-validator';

export class ApplyJobDto {
  @IsString()
  jobPositionId: string;

  @IsOptional()
  @IsString()
  coverLetter?: string;

  @IsOptional()
  @IsString()
  resumeUrl?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
