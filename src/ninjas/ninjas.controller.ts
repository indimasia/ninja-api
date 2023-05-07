import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { NinjasService } from './ninjas.service';
import { RoleGuard } from 'src/role/role.guard';

@Controller('ninjas')
export class NinjasController {
    constructor(
        private readonly ninjasService: NinjasService
    ) {}
    
    @Get()
    @UseGuards(RoleGuard)
    findAll(@Query('belt') belt: 'green' | 'black' | 'purple') {
        return this.ninjasService.findAll(belt);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        try {
            return this.ninjasService.findOne(id);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Post()
    create(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
        return this.ninjasService.create(createNinjaDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ninjasService.delete(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateNinjaDto: CreateNinjaDto) {
        return this.ninjasService.update(id, updateNinjaDto);
    }
}
