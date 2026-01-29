// In-memory store for cases (Demo purposes)
// In a real production app, this would be a database like PostgreSQL or MongoDB
import { UserRecord } from './database';

class CaseStore {
    private static instance: CaseStore;
    private cases: Map<number, UserRecord> = new Map();

    private constructor() { }

    public static getInstance(): CaseStore {
        if (!CaseStore.instance) {
            CaseStore.instance = new CaseStore();
        }
        return CaseStore.instance;
    }

    public addCase(newCase: UserRecord) {
        this.cases.set(newCase.idreg, newCase);
    }

    public updateCaseStatus(id: number, status: number) {
        const existing = this.cases.get(id);
        if (existing) {
            existing.status = status;
            existing.horamodificado = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' });
            this.cases.set(id, existing);
        }
    }

    public updateCaseData(id: number, data: Partial<UserRecord>) {
        const existing = this.cases.get(id);
        if (existing) {
            const updated = { ...existing, ...data };
            updated.horamodificado = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' });
            this.cases.set(id, updated);
        }
    }

    public getCase(id: number): UserRecord | undefined {
        return this.cases.get(id);
    }

    public getAllCases(): UserRecord[] {
        return Array.from(this.cases.values()).sort((a, b) =>
            new Date(b.horamodificado).getTime() - new Date(a.horamodificado).getTime()
        );
    }

    public clear() {
        this.cases.clear();
    }
}

export const caseStore = CaseStore.getInstance();
