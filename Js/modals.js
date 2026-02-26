?('.signup').on('click',function(){
    ?('.modal-body').load('signup.html',function(){
        ?('#myModal').modal({show:true});
    });
});