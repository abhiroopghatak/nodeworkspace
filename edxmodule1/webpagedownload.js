// execution of this node js file will accept url of the desired web page in cli
// argument and download the html of that page use file writer and write html
// into it.

const http = require('http')
const fs = require('fs')
const path = require('path')
const uuidv1 = require('uuid/v1')
const folderName = uuidv1()

const url = process.argv[2]

// html download funtion
	const fetchPage = (url,fileFunction)=>{
		if(url == null || url == undefined){
			console.log("None url recieved")
		}else{	
			console.log("fetch page starts at " , new Date)
			console.log("URL Recieved from CLI is : ", url)
				http.get( url, (response)=>{
					console.log('downloading ', url)
					let htmltext=''
					response.on('data' , (chunk)=>{
						htmltext+=chunk
					})
					response.on('error' , (err)=>{
						fileFunction(error)
					})
					response.on('end' , ()=>{
						console.log("Page download complete at " , new Date)
						fileFunction(null,htmltext)
					})
				}).on('error' , (error)=>{
					fileFunction(error,null)
				})
			}
	}
	
	
	// file write section
	fetchPage(url , (error , data)=>{
		console.log('URL recieved in argument ' , url.toString())
		if(error == null && data !=undefined){
			const fileNameFullPath =path.join(__dirname,folderName , 'downloadPage.html') 
			console.log('Page download success')
			fs.mkdirSync(folderName, null);
//			fs.mkdir(folderName);
			fs.writeFileSync(fileNameFullPath, '<!--'+url+'-->')
			fs.writeFileSync(fileNameFullPath, data)
			console.log('File : ',fileNameFullPath)
		}else{
			console.error(error);
		}
	})