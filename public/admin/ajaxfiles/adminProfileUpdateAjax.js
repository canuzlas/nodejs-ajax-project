$(document).ready(()=>{
    $("#adminupdatebutton").click((event)=>{
        event.preventDefault()
        var email,username,password;
        email = $("#admin_email");
        username = $("#admin_username");
        password = $("#admin_password");

        if(email.val().length <= 1 || username.val().length <= 1 || password.val().length <= 1 ){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Birazcık uzun birşeyler gir yahu!',
                timer: 3000
            })
        }else{
            const data = $("#adminProfileForm").serialize();

            $.ajax({
                method:"POST",
                url:"/admin/management/logged/updateadminprofile",
                data:data,
                success:(callback)=>{
                    if(callback){
                        setTimeout(()=>{
                            location.reload()
                        },3000)
                        return Swal.fire({
                            icon: 'success',
                            title: 'Tebrikler',
                            text: 'Profiliniz Güncellendi!',
                            timer: 3000
                        })
                    }else{
                        return Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Birşeyler ters gitti!',
                            timer: 3000
                        })

                    }
                }
            })
        }
    })
})