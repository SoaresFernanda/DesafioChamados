$(document).ready(function () {

    $('.glyphicon-calendar').closest("div.date").datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: false,
        format: 'dd/mm/yyyy',
        autoclose: true,
        language: 'pt-BR'
    });

    $('#btnCancelar').click(function () {
        Swal.fire({
            html: "Deseja cancelar essa operação? O registro não será salvo.",
            type: "warning",
            showCancelButton: true,
        }).then(function (result) {
            if (result.value) {
                history.back();
            } else {
                console.log("Cancelou a inclusão.");
            }
        });
    });

    $('#btnSalvar').click(function () {

        if ($('#form').valid() != true) {
            FormularioInvalidoAlert();
            return;
        }
        var dataAbertura = new Date($('#DataAbertura').val().split('/').reverse().join('-'));
        var hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        if (dataAbertura < hoje) {
            Swal.fire({
                text: "A data de abertura não pode ser uma data retroativa.",
                icon: 'warning'
            });
            return;
        }



        let chamado = SerielizeForm($('#form'));
        let url = $('#form').attr('action');
        //debugger;

        $.ajax({
            type: "POST",
            url: url,
            data: chamado,
            success: function (result) {

                Swal.fire({
                    type: result.Type,
                    title: result.Title,
                    text: result.Message,
                }).then(function () {
                    window.location.href = config.contextPath + result.Controller + '/' + result.Action;
                });

            },
            error: function (result) {

                Swal.fire({
                    text: result,
                    confirmButtonText: 'OK',
                    icon: 'error'
                });

            },
        });
    });
    $('#btnExcluir').click(function () {

        let chamado = SerielizeForm($('#form'));
        let idChamado = chamado.ID;

        Swal.fire({
            text: "Tem certeza de que deseja excluir este registro?",
            icon: "warning",
            showCancelButton: true
        }).then(function (result) {
            if (result.value) {
                $.ajax({
                    url: `/Chamados/Excluir/${idChamado}`,
                    type: 'DELETE',
                    success: function (result) {
                        Swal.fire({
                            type: result.Type,
                            title: result.Title,
                            text: result.Message
                        }).then(function () {
                            window.location.href = config.contextPath + 'Chamados/Listar';
                        });
                    },
                    error: function (xhr) {
                        Swal.fire({
                            text: xhr.responseText,
                            icon: 'error'
                        });
                    }
                });
            }
        });
    });
});
