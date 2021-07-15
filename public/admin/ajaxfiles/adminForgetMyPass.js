$(document).ready(() => {
    $('#nextemail').click(() => {

        const email = $('#emailadress').val()

        if (email.length <= 4) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'En Az 5 karakter uzunluğunda olmalı.!',
                timer: 3000
            })
        }

        $.ajax({
            method: 'POST',
            url: '/admin/management/logged/forgetmypass',
            data: { email: email },
            success: function (callback) {
                if (callback.status) {
                    $('#email').hide()
                    $('#verify').show()
                    return
                } else {
                    return Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Lütfen Daha Sonra Tekrar Deneyin.!',
                        timer: 3000
                    })
                }
            }
        })
    })
    $('#nextverify').click(() => {

        const code = $('#verifycode').val()
        if (code.length <= 4) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'En Az 4 karakter uzunluğunda olmalı.!',
                timer: 3000
            })
        }

        $.ajax({
            method: 'POST',
            url: '/admin/management/logged/verifycode',
            data: { code: code },
            success: function (callback) {
                if (callback.status) {
                    $('#verify').hide()
                    $('#passwordform').show()
                    return
                } else {
                    return Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Kod hatalı!',
                        timer: 3000
                    })
                }
            }
        })


        

    })
    $('#updatepassword').click(()=>{
        var pass1 = $('#newpass1').val()
        var pass2 =  $('#newpass2').val()

        if(pass1.length <=7 || pass2.length <=7){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Şifreniz En Az 8 karakter uzunluğunda olmalı.!',
                timer: 3000
            })
        }

        if(pass1 !== pass2){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Şifreler uyuşmuyor.!',
                timer: 3000
            })
        }

        $.ajax({
            method: 'POST',
            url: '/admin/management/logged/updatepassforadmin',
            data: { password: pass1 },
            success: function (callback) {
                if (callback.status) {
                    $('#passwordform').hide()
                    $('#status').show()
                    return
                } else {
                    return Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Bir sorun oluştu!',
                        timer: 3000
                    })
                }
            }
        })











    })



})