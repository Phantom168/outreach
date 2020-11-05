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

    form_obj['status']='pending';
    
    delete form_obj[""];

    if(!/\S{2,}/.test(form_obj.name)){
        alert("Please Enter your name");
        return
    }

    if(!/\S{2,}/.test(form_obj.phone)){
        alert("Please Enter your Phone Number");
        return
    }

    if(!/\S{2,}/.test(form_obj.title)){
        alert("Please Enter a valid Title");
        return
    }

    if(!/\d{2,}-\d{1,}-\d{1,}/.test(form_obj['achievement-date'])){
        alert("Please Input the achievement Date");
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
                db.collection('submissions').doc(metadata.name).set(form_obj)
                .then(function() {
                    console.log("Successfully submitted the form");
                    alert('Form Successfully Submitted');
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
            })
            
        })
    }else{
        db.collection('submissions').doc(metadata.name).set(form_obj)
        .then(function() {
            console.log("Successfully submitted the form");
            alert('Form Successfully Submitted');
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }
    $('#content-overlay').fadeOut();
    formEl.reset();
    
    
    

    

    

    
}

function checkFileSize(file){
    if(file.size>2048){
        return true
    }else{
        return false
    }
}

