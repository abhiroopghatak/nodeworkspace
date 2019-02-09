/**
 * http://usejsdoc.org/
 */
const csvtojson = require('convert-csv-to-json')
const path = require('path')
const fs = require('fs')
const dataDirName = process.argv[2]
const csvFileName = process.argv[3]
const jsonFileName = process.argv[4]

const processFile = (csvFileName,errorLogger)=>{

	try{
		var converter =csvtojson.Converter
		const csvFilePath = path.join(__dirname, dataDirName, csvFileName)
		const jsonFilePath = path.join(__dirname, dataDirName, jsonFileName)
		console.log('csv data to read from: ' , csvFilePath)
	csvtojson.generateJsonFileFromCsv(csvFilePath,jsonFilePath);
	}catch(e){
		console.error("error at file processing")
		errorLogger(e)
	}
}

processFile(csvFileName , (error)=>{
	console.error(error)
})

