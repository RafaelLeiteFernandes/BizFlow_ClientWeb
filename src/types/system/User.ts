export interface User {
    id?: number; // Automático do Banco
    username: string;
    password: string;
    email: string;
    sector: string;
    full_name: string;
    createdAt?: Date; // Automático do Banco
    updatedAt?: Date; // Automático do Banco
}
