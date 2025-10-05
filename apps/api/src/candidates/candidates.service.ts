import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { ApplyJobDto } from './dto/apply-job.dto';

@Injectable()
export class CandidatesService {
  constructor(private prisma: PrismaService) {}

  async createCandidate(createCandidateDto: CreateCandidateDto) {
    try {
      // Verificar se já existe um candidato com este email
      const existingCandidate = await this.prisma.candidate.findUnique({
        where: { email: createCandidateDto.email },
      });

      if (existingCandidate) {
        throw new ConflictException('Já existe um candidato com este email');
      }

      const candidate = await this.prisma.candidate.create({
        data: {
          ...createCandidateDto,
          skills: createCandidateDto.skills || [],
          preferredDepartments: createCandidateDto.preferredDepartments || [],
        },
      });

      return candidate;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new Error('Erro ao criar candidato: ' + error.message);
    }
  }

  async getCandidateByEmail(email: string) {
    const candidate = await this.prisma.candidate.findUnique({
      where: { email },
      include: {
        applications: {
          include: {
            jobPosition: true,
          },
        },
      },
    });

    if (!candidate) {
      throw new NotFoundException('Candidato não encontrado');
    }

    return candidate;
  }

  async updateCandidate(email: string, updateData: Partial<CreateCandidateDto>) {
    const candidate = await this.prisma.candidate.update({
      where: { email },
      data: updateData,
    });

    return candidate;
  }

  async applyToJob(email: string, applyJobDto: ApplyJobDto) {
    // Verificar se o candidato existe
    const candidate = await this.prisma.candidate.findUnique({
      where: { email },
    });

    if (!candidate) {
      throw new NotFoundException('Candidato não encontrado');
    }

    // Verificar se a vaga existe
    const jobPosition = await this.prisma.jobPosition.findUnique({
      where: { id: applyJobDto.jobPositionId },
    });

    if (!jobPosition) {
      throw new NotFoundException('Vaga não encontrada');
    }

    // Verificar se já existe uma aplicação para esta vaga
    const existingApplication = await this.prisma.jobApplication.findUnique({
      where: {
        candidateId_jobPositionId: {
          candidateId: candidate.id,
          jobPositionId: applyJobDto.jobPositionId,
        },
      },
    });

    if (existingApplication) {
      throw new ConflictException('Você já se candidatou para esta vaga');
    }

    // Criar a aplicação
    const application = await this.prisma.jobApplication.create({
      data: {
        candidateId: candidate.id,
        jobPositionId: applyJobDto.jobPositionId,
        coverLetter: applyJobDto.coverLetter,
        resumeUrl: applyJobDto.resumeUrl,
        notes: applyJobDto.notes,
      },
      include: {
        jobPosition: true,
      },
    });

    return application;
  }

  async getCandidateApplications(email: string) {
    const candidate = await this.prisma.candidate.findUnique({
      where: { email },
      include: {
        applications: {
          include: {
            jobPosition: true,
          },
          orderBy: {
            appliedAt: 'desc',
          },
        },
      },
    });

    if (!candidate) {
      throw new NotFoundException('Candidato não encontrado');
    }

    return candidate.applications;
  }

  async getJobPositions() {
    return this.prisma.jobPosition.findMany({
      where: { isActive: true },
      orderBy: { postedDate: 'desc' },
    });
  }

  async getJobPositionById(id: string) {
    const jobPosition = await this.prisma.jobPosition.findUnique({
      where: { id },
    });

    if (!jobPosition) {
      throw new NotFoundException('Vaga não encontrada');
    }

    return jobPosition;
  }
}
