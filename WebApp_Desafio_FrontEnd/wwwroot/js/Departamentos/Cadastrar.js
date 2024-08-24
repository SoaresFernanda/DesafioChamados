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

        let departamento = SerielizeForm($('#form'));
        let url = $('#form').attr('action');

        $.ajax({
            type: "POST",
            url: url,
            data: departamento,
            success: function (result) {

                Swal.fire({
                    icon: result.Type,
                    title: result.Title,
                    text: result.Message,
                }).then(function () {
                    window.location.href = config.contextPath + result.Controller + '/' + result.Action;
                });

            },
            error: function (result) {

                Swal.fire({
                    text: result.responseText,
                    confirmButtonText: 'OK',
                    icon: 'error'
                });

            },
        });
    });
    
    function SerielizeForm(form) {
        let serializedArray = form.serializeArray();
        let data = {};
        $.each(serializedArray, function () {
            if (data[this.name]) {
                if (!data[this.name].push) {
                    data[this.name] = [data[this.name]];
                }
                data[this.name].push(this.value || '');
            } else {
                data[this.name] = this.value || '';
            }
        });
        return data;
    }

    function FormularioInvalidoAlert() {
        Swal.fire({
            text: 'Por favor, preencha todos os campos obrigatórios.',
            icon: 'warning'
        });
    }

    $('#btnExcluir').click(function () {

        let departamento = SerielizeForm($('#form'));
        let idDepartamento = departamento.ID;

        Swal.fire({
            text: "Tem certeza de que deseja excluir este registro?",
            icon: "warning",
            showCancelButton: true
        }).then(function (result) {
            if (result.value) {
                $.ajax({
                    url: `/Departamentos/Excluir/${idDepartamento}`,
                    type: 'DELETE',
                    success: function (result) {
                        Swal.fire({
                            type: result.Type,
                            title: result.Title,
                            text: result.Message
                        }).then(function () {
                            window.location.href = config.contextPath + 'Departamentos/Listar';
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
