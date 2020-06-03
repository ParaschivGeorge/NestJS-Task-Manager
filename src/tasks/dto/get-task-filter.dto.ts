import {TaskStatus} from "../task.model";
import {IsIn, IsNotEmpty, IsOptional} from "class-validator";

export class GetTaskFilterDto {
    @IsOptional()
    @IsIn([TaskStatus.IN_PROGRESS, TaskStatus.DONE, TaskStatus.OPEN])
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}