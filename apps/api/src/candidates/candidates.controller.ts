import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { ApplyJobDto } from './dto/apply-job.dto';

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCandidate(@Body() createCandidateDto: CreateCandidateDto) {
    return this.candidatesService.createCandidate(createCandidateDto);
  }

  @Get('profile')
  async getCandidateByEmail(@Query('email') email: string) {
    return this.candidatesService.getCandidateByEmail(email);
  }

  @Put('profile')
  async updateCandidate(
    @Query('email') email: string,
    @Body() updateData: Partial<CreateCandidateDto>,
  ) {
    return this.candidatesService.updateCandidate(email, updateData);
  }

  @Post('apply')
  @HttpCode(HttpStatus.CREATED)
  async applyToJob(
    @Query('email') email: string,
    @Body() applyJobDto: ApplyJobDto,
  ) {
    return this.candidatesService.applyToJob(email, applyJobDto);
  }

  @Get('applications')
  async getCandidateApplications(@Query('email') email: string) {
    return this.candidatesService.getCandidateApplications(email);
  }

  @Get('jobs')
  async getJobPositions() {
    return this.candidatesService.getJobPositions();
  }

  @Get('jobs/:id')
  async getJobPositionById(@Param('id') id: string) {
    return this.candidatesService.getJobPositionById(id);
  }
}
