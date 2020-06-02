import {Injectable} from '@nestjs/common';
import {Task, TaskStatus} from "./task.model";
import { v4 as uuid } from 'uuid';
import {CreateTaskDto} from "./dto/create-task.dto";
import {GetTaskFilterDto} from "./dto/get-task-filter.dto";

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getAllTasksFiltered(filterDto: GetTaskFilterDto): Task[] {
        const { status, search } = filterDto;
        let tasks = this.getAllTasks();

        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }

        if (search) {
            tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
        }

        return tasks;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task);
        return task;
    }

    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }

    deleteTaskById(id: string) {
        this.tasks = this.tasks.filter(tasks => tasks.id !== id);
    }

    updateTaskStatusById(id:string, status: TaskStatus): Task {
        const task = this.tasks.find(task => task.id === id);
        task.status = status

        return task;
    }

}
