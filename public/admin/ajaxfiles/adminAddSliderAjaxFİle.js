$(document).ready(() => {
    $("#sliderekle").click(() => {
        var slider_baslik = $("#slider_baslik");
        var slider_altaciklama = $("#slider_altaciklama");
        var slider_more = $("#slider_more");
        var file = document.querySelector("#slider_resim").files[0];

        if (slider_baslik.val().length <= 4 || slider_altaciklama.val().length <= 4 || slider_more.val().length <= 4 || file === undefined) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'En Az 5 karakter uzunluğunda olmalı ve resim yüklemek zorunlu!',
                timer: 3000
            })
        }
        $("#addsliderform").submit();
    })


    $(".slidersil").click(function (event) {
        event.preventDefault()
        var id = $(this).attr('id')

        $.ajax({
            method: "POST",
            url: "/admin/management/logged/deleteslider",
            data: { id: id },
            success: (callback) => {
                if (callback.status) {
                    $("." + id).remove();
                    return Swal.fire({
                        icon: 'success',
                        title: 'Tebrikler.!',
                        text: 'Slider silme işleminiz başarılı..',
                        timer: 2000
                    })
                } else {
                    return Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Slider silme işleminiz maalesef gerçekleşmedi.!',
                        timer: 3000
                    })
                }
            }
        })

    })

    $("#sliderupdate").click(() => {
        var slider_baslik = $("#slider_baslik");
        var slider_altaciklama = $("#slider_altaciklama");
        var slider_more = $("#slider_more");

        if (slider_baslik.val().length <= 4 || slider_altaciklama.val().length <= 4 || slider_more.val().length <= 4) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'En Az 5 karakter uzunluğunda olmalı.!',
                timer: 3000
            })
        }

        $("#updatesliderform").submit();
    })

    var urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('success') === "true") {
        return Swal.fire({
            icon: 'success',
            title: 'Tebrikler.!',
            text: 'Slider ekleme işleminiz başarılı..',
            timer: 2000
        })
    } else if (urlParams.get('success') === "false") {
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Slider ekleme işleminiz maalesef gerçekleşmedi.!',
            timer: 3000
        })
    } else if (urlParams.get('status') === "notfind") {
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Slider Bulunamadı!',
            timer: 3000
        })
    }else if (urlParams.get('update') === "true") {
        return Swal.fire({
            icon: 'success',
            title: 'Tebrikler',
            text: 'Slider Güncellendi!',
            timer: 3000
        })
    }else if (urlParams.get('update') === "false") {
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Slider Güncelleme İşlemi Başarsız!',
            timer: 3000
        })
    }
})