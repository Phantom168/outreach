
//console.log("cs19btech11047@cse.iiith.ac.in".split(/@(iith\.ac\.in|cse\.iith\.ac\.in)$/g))
//iithName = firebase.auth().currentUser.email;
//console.log(iithName)
// formEl.addEventListener('submit',(e)=>{
//     e.preventDefault();
//     console.log(formEl.name,formEl.name.value)
//     //console.log(document.forms['publication-form'].elements.length)
//     let form_obj = new Object();
//     console.log(form_obj)
//     for(let i =0;i<formEl.elements.length;i++){
//         console.log(formEl.elements[i].name,formEl.elements[i].value)
//         form_obj[`${formEl.elements[i].name}`] = formEl.elements[i].value
//     }
    
//     delete form_obj[""];
//     console.log(form_obj);
//     let date = new Date()
//     const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
//     const selectedFile = document.getElementById('file-upload').files[0];
//     if(selectedFile.size>1024){
//         alert("Very large file")
//     }
//     let metadata={
//         name:`${form_obj.name}-${dateString}`
//     }

//     let fileRef = storageRef.child(`submissions_assets/${metadata.name}`)
//     let fileURL;
//     fileRef.put(selectedFile,metadata).then(function(snapshot){
//         console.log('fileuploaded');
//         console.log(snapshot)
//         snapshot.ref.getDownloadURL().then(function(url){
//             console.log(url)
//         })
        
//     })

    
    
    // database.ref('submissions/'+ form_obj['name']).set(form_obj);
    
// })

function afterFirebaseLoad(){
    const formEl = document.getElementById('publication-form');
    console.log(iithName)
    formEl.addEventListener('submit',submitPublicationForm);
    
}

function submitPublicationForm(e){
    e.preventDefault();

    let form_obj = new Object();

    const formEl = document.getElementById('publication-form');

    for(let i =0;i<formEl.elements.length;i++){

        form_obj[`${formEl.elements[i].name}`] = formEl.elements[i].value
    }
    
    delete form_obj[""];

    if(!/\S{2,}/.test(form_obj.name)){
        alert("Please Enter your name");
        return
    }

    if(!/\S{2,}/.test(form_obj.title)){
        alert("Please Enter a valid Title");
        return
    }

    if(!/\d{2,}-\d{1,}-\d{1,}/.test(form_obj['publication-date'])){
        alert("Please Input the publication Date");
        return
    }
    const userUID = `outreach-${currentUser.uid}`;
    form_obj['userUID'] = userUID;
    console.log(form_obj)

    let date = new Date()
    const dateTimeString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`
    let metadata={
        name:`${iithName}-${dateTimeString}`
    }
    
    $('#content-overlay span').text='Submitting';
    $('#content-overlay').show();

    const selectedFile = document.getElementById('file-upload').files[0];
      
    if(selectedFile){
        if(selectedFile.size>2048*1024){
            $('#content-overlay').fadeOut();
            alert("Please select another file of less than 2MB")
            return;
        }
        let fileRef = storageRef.child(`submissions_assets/${metadata.name}`)
        fileRef.put(selectedFile,metadata).then(function(snapshot){
            console.log('fileuploaded');
            console.log(snapshot)
            snapshot.ref.getDownloadURL().then(function(url){
                console.log(url)
                form_obj['thumbnail']=url + ' ';
                console.log(form_obj)
                database.ref('submissions/'+ metadata.name).set(form_obj);
            })
            
        })
    }else{
        database.ref('submissions/'+ metadata.name).set(form_obj);
    }
    $('#content-overlay').fadeOut();
    formEl.reset();
    alert('Form Successfully Submitted');
    
    

    

    

    
}

function checkFileSize(file){
    if(file.size>2048){
        return true
    }else{
        return false
    }
}

