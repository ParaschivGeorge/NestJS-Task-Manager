import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateTaskDto} from "./dto/create-task.dto";
import {GetTaskFilterDto} from "./dto/get-task-filter.dto";
import {TaskRepository} from "./task.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Task} from "./task.entity";
import {TaskStatus} from "./taskStatus.enum";
import {DeleteResult} from "typeorm";
import {User} from "../auth/user.entity";

@Injectable()
export class TasksService {

    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) {
    }

    getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto, user);
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user);
    }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`task with id ${id} not found`);
        }
        return found;
    }

    async deleteTaskById(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id);
        if (!result.affected) {
            throw new NotFoundException(`task with id ${id} not found`);
        }
    }

    async updateTaskStatusById(id: number, status: TaskStatus, user: User): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status
        await task.save();
        return task;
    }

}
