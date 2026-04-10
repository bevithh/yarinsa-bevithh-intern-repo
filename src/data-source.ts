import { DataSource } from "typeorm";
import { Habit } from "./habits/habit.entity";
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "user",
    password: "password",
    database: "focus_bear",
    synchronize: false, // Always false when using migrations
    logging: true,
    entities: [Habit],
    migrations: ["./src/migrations/*.ts"],
});