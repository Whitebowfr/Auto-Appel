import { readFile, writeFile } from "fs"
import { classData, student } from "../types"

function readClassDatabase(id: number): Promise<classData> {
    return new Promise((resolve: any, reject: any) => {
        readFile("./database/classes.json", "utf-8", (err, data) => {
            if (err) reject(err)
            else {
                let objectData: classData[] = Object.values(JSON.parse(data))
                let result: classData = objectData.filter(x => x.id == id)[0]
                resolve(result)
            }
        })
    })
}

function writeToClassDatabase(id: number, dataToReplace: classData): void {
    readFile("./database/classes.json", "utf-8", (err, data) => {
        if (err) console.log("[ERROR] " + err);
        else {
            let objectData: classData[] = JSON.parse(data)
            let objectDataBis = { ...objectData }

            for (let test in objectData) {
                let idOfClass = objectData[test].id
                if (id === idOfClass) {
                    objectDataBis[test] = dataToReplace
                }
            }

            writeFile("./database/classes.json", JSON.stringify(objectDataBis), (err) => { })
        }

    })
}

export function getAllClasses(): Promise<classData[]> {
    return new Promise((resolve: any, reject: any) => {
        readFile("./database/classes.json", "utf-8", (err, data) => {
            if (err) console.log("[ERROR] " + err)
            else {
                let object: classData[] = Object.values(JSON.parse(data))
                let result: object[] = Object.values(object).map(x => ({ id: x.id, label: x.name, level: x.level }))
                resolve(result)
            }
        })
    })
}

export function getDatabaseEntireClass(id: number): Promise<classData> {
    return new Promise((resolve: any, reject: any) => {
        readClassDatabase(id)
            .then((data: classData) => {
                resolve(data)
            })
    })
}

export function setClassStudents(id: number, students: student[]): void {
    readClassDatabase(id)
        .then((data: classData) => {
            data.students = students
            writeToClassDatabase(id, data)
        })
}

export function addClassToDatabase(classe: classData): Promise<boolean> {
    return new Promise((resolve, reject) => {
        readFile("./database/classes.json", "utf-8", (err: any, data: any) => {
            if (err) reject(err)
            else {
                let objectData: classData[] = Object.values(JSON.parse(data))
                let maxId = 0
                objectData.forEach(element => {
                    maxId = Math.max(element?.id, maxId)
                });
                maxId++
                let fullClass: classData = {
                    id: maxId,
                    name: classe.name ?? '',
                    level: classe.level ?? '',
                    students: classe.students ?? []
                }
                let object = JSON.parse(data)
                object[maxId] = fullClass
                writeFile("./database/classes.json", JSON.stringify(object), (err) => {
                    if (err) reject(err)
                    else resolve(true)
                })
            }
        })
    })
}

export function sanitizeStudentName(name: string): string {
    return name.toLowerCase().replace(" ", "_")
}

export function addStudentToDatabase(targetId: number, name: string, firstName: string): Promise<boolean> {
    return new Promise((res, rej) => {
        if (name == '' || firstName == '' || targetId == undefined) rej(false)
        readClassDatabase(targetId)
            .then((classe: classData) => {
                let newName = sanitizeStudentName(firstName + name)
                let classeBis = {...classe}
                classeBis.students.push({
                    firstName: firstName,
                    lastName: name,
                    photoPath: newName
                })
                writeToClassDatabase(targetId, classeBis)
                res(true)
            })
    })
}