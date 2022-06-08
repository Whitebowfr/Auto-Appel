export interface classData {
    id: number,
    name: string,
    level: string,
    students: student[]
}

export interface student {
    firstName: string,
    lastName: string,
    photoPath: string
}

export interface pythonRecording {
    id: number,
    process: any
}