$(document).ready(() => {
    $("#adminLoginButton").click((event) => {
        event.preventDefault()
        data = $(".adminLogin").serialize()

        if ($("#exampleInputEmail").val().length <= 4 || $("#exampleInputPassword").val().length <= 7) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Kullanıcı adın veya şifren hatalı!',
                timer: 3000,
                footer: '<a href="/admin/management/forgetadminpassword">Şifreni mi unuttun?</a>'
            })
        }

        $.ajax({
            method: "POST",
            data: data,
            url: "/admin/management/login",
            success: function (callback) {
                if (callback.response) {
                    return window.location.href = "/admin/management/logged";
                }else{
                    return Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Kullanıcı adın veya şifren hatalı!',
                        timer: 3000,
                        footer: '<a href="/admin/management/forgetadminpassword">Şifreni mi unuttun?</a>'
                    })
                }
            }
        })
    })
})