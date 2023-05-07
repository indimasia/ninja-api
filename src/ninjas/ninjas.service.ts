import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {
    private ninjas = [
        {
            id: 1,
            name: 'Ryu',
            belt: 'black'
        },
        {
            id: 2,
            name: 'Yoshi',
            belt: 'green'
        },
        {
            id: 3,
            name: 'Crystal',
            belt: 'purple'
        },
    ]

    findAll(belt?: 'green' | 'black' | 'purple') {
        console.log(belt)
        if(belt) {
            return this.ninjas.filter(ninja => ninja.belt === belt);
        }

        return this.ninjas;
    }

    findOne(id: string) {
        const ninja = this.ninjas.find(ninja => ninja.id === parseInt(id));
        if(!ninja) {
            throw new Error('Ninja not found');
        }

        return ninja;
    }

    create(createNinjaDto: CreateNinjaDto) {
        const newNinja = {
            id: Date.now(),
            ...createNinjaDto
        }
        this.ninjas.push(newNinja);

        return newNinja;
    }

    update(id: string, updateNinjaDto: UpdateNinjaDto) {
        const index = this.ninjas.findIndex(ninja => ninja.id === parseInt(id));
        this.ninjas[index] = {
            ...this.ninjas[index],
            ...updateNinjaDto
        };

        return this.ninjas[index];
    }

    delete(id: string) {
        const removeNinja = this.ninjas.find(ninja => ninja.id === parseInt(id));
        this.ninjas = this.ninjas.filter(ninja => ninja.id !== parseInt(id));
        return removeNinja;
    }
}
