import { getAllClasses, addStudentToDatabase, getDatabaseEntireClass, addClassToDatabase } from "./database/database_interface";
import { classData, pythonRecording, student } from "./types";

const PORT:number = 3001
const URL:string = "localhost"

const express = require("express");
var cors = require('cors')
const app = express().use('*', cors());
const spawn = require("child_process").spawn;

app.use(express.json());
app.use(express.urlencoded())

app.use(express.static(__dirname + '/public/'))

var globalPython: pythonRecording[] = [];
var globalRecognitionRAM: {
	[key: string]: string[]
} = {}

app.post("/launchPythonCamera", (req: any, res: any) => {
	res.set('Access-Control-Allow-Origin', '*');

	let id = parseInt(req.body.id)
	if (globalPython.every(x => x.id !== id)) {
		let pythonProcess = spawn("py", ["./scripts/record.py", id])

		pythonProcess.stdout.on("data", (data: any) => {
			console.log(data.toString())
		})
		
		let pyObject: pythonRecording = {
			id: id,
			process: pythonProcess
		}

		globalPython.push(pyObject)
	}
})

app.get("/stopPythonCamera", (req:any, res: any) => {
	res.set('Access-Control-Allow-Origin', '*');

	let id = parseInt(req.query.id)
	globalPython.forEach((process, index) => {
		if (process.id === id) {
			globalPython[index].process.kill('SIGINT')
			globalPython.splice(index, 1);
		}
	});
})

app.post('/startRecognitionProcess', (req: any, res: any) => {
	res.set('Access-Control-Allow-Origin', '*')

	let id = parseInt(req.body.id)
	if (globalPython.every(x => x.id !== id)) {
		let pythonProcess = spawn("py", ["./scripts/reconnaissance.py", id])
		globalRecognitionRAM[id.toString()] = []
		console.log(globalRecognitionRAM)
		pythonProcess.stdout.on("data", (data: any) => {
			if (globalRecognitionRAM[id.toString()].indexOf(data) === -1) {
				globalRecognitionRAM[id.toString()].push(data)
			}
		})
	}
})

app.post('/stopRecognitionProcess', (req: any, res: any) => {
	res.set('Access-Control-Allow-Origin', '*')

	let id = parseInt(req.body.id)
	globalPython.forEach((element, index) => {
		if (element.id === id) {
			globalPython[index].process.kill()
		}
	});
})

app.get('/getDatabaseEntireClass', (req: any, res: any) => {
	res.set('Access-Control-Allow-Origin', '*')

	getDatabaseEntireClass(req.query.id)
		.then((classe: classData) => {
			let temp: any = {...classe}
			if (globalRecognitionRAM[req.query.id.toString()]) {
				temp.students.forEach((student: student, index: number) => {
					temp.students[index].present = globalRecognitionRAM[req.query.id.toString()].indexOf(student.photoPath)
				});
			}
			res.send(JSON.stringify(temp))
			res.end()
		})
})

app.get("/getClassesFromLevel", (req: any, res: any) => {
	res.set('Access-Control-Allow-Origin', '*');

	let level = req.query.lvl
	getAllClasses()
		.then((classes: classData[]) => {
			let requiredClasses = classes.filter(x => x.level === level)
			requiredClasses.map(x => x.name)
			res.send(JSON.stringify(requiredClasses))
		})
})

app.get("/getFaceRecognitionUpdate", (req: any, res: any) => {
	res.set('Access-Control-Allow-Origin', '*');

	let id = parseInt(req.query.id)
	getDatabaseEntireClass(id)
		.then((classe: classData) => {
			if (globalRecognitionRAM[id.toString()]) {
				res.send(JSON.stringify({detected: globalRecognitionRAM[id.toString()].length, entire: classe.students.length}))
			}
			res.end()
		})
})

app.post('/addClassToDatabase', (req: any, res: any) => {
	res.set('Access-Control-Allow-Origin', '*')

	addClassToDatabase(req.body)
		.catch(e => {
			if (e) res.status(400)
			res.end()
		})
		.then(data => {
			if (data) res.status(200)
			res.end()
		})
})

app.post('/addStudentToDatabase', (req: any, res: any) => {
	res.set('Access-Control-Allow-Origin', '*')

	addStudentToDatabase(req.body.targetId, req.body.firstName, req.body.name)
		.catch(e => {
			if (e) res.status(400)
			res.end()
		})
		.then (data => {
			if (data) res.status(200)
			res.end()
		})
})

app.post('/removeStudentFromDatabase', (req: any, res: any) => {
	res.set('Access-Control-Allow-Origin', '*')
})

app.listen(PORT, URL, (e: Error|null) => {
	if (e) console.error(e)
	else console.log(`Listening on : ${URL}:${PORT}`)
})
