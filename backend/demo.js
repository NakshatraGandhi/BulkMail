const fileInput=document.getElementById("fileInput")

fileInput.addEventListener("change",function(event){
    const file=event.target.files[0]

    const reader=new FileReader()//creating the object for file reading purpose

    reader.onload=function(event){
        const data=event.target.result
        const workbook = XLSX.read(data, {type: 'binary' })
        const sheetName=workbook.SheetNames[0]
        const worksheet=workbook.Sheets[sheetName]
        const emailList=XLSX.utils.sheet_to_json(worksheet,{header:'A'})
        console.log(emailList)
    }
    reader.readAsBinaryString(file)//by default excel can read in binary format only 
})