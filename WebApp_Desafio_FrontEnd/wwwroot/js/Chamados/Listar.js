$(document).ready(function () {
    var table = $('#dataTables-Chamados').DataTable({
        ajax: {
            url: config.contextPath + 'Chamados/Datatable',
            dataSrc: 'data'
        },
        columns: [
            { data: 'ID' },
            { data: 'Assunto' },
            { data: 'Solicitante' },
            { data: 'Departamento' },
            { data: 'DataAberturaWrapper', title: 'Data Abertura' }
        ],
        dom: 't'
    });

    $("#autocompleteSolicitante").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: config.contextPath + 'Chamados/ObterSolicitantes',
                dataType: "json",
                data: {
                    solicitante: request.term
                },
                success: function (data) {
                    var formattedData = data.data.map(function (item) {
                        return {
                            label: item.Solicitante,
                            value: item.Solicitante
                        };
                    });
                    response(formattedData);
                },
                error: function (xhr, status, error) {
                    console.error("Erro ao buscar solicitantes: ", status, error);
                }
            });
        },
        minLength: 3,
        select: function (event, ui) {
            
            $.ajax({
                url: config.contextPath + 'Chamados/Datatable',
                dataType: "json",
                data: {
                    termo: ui.item.value 
                },
                success: function (data) {
                    var formattedData = data.data.filter(function (item) {
                        return item.Solicitante === ui.item.value;
                    });

                    table.clear().rows.add(formattedData).draw();
                },
                error: function (xhr, status, error) {
                    console.error("Erro ao filtrar chamados: ", status, error);
                }
            });
        }
    });

    $("#autocompleteSolicitante").on('input', function () {
        if ($(this).val() === '') {
            $.ajax({
                url: config.contextPath + 'Chamados/Datatable',
                dataType: "json",
                success: function (data) {
                    table.clear().rows.add(data.data).draw();
                },
                error: function (xhr, status, error) {
                    console.error("Erro ao obter todos os chamados: ", status, error);
                }
            });
        }
    });

    $('#dataTables-Chamados tbody').on('dblclick', 'tr', function () {
        var data = table.row(this).data();
        if (data) {
            window.location.href = config.contextPath + 'Chamados/Editar/' + data.ID;
        } else {
            Swal.fire({
                text: "Erro ao obter os dados do chamado.",
                icon: 'error'
            });
        }
    });

    $('#btnRelatorio').click(function () {
        window.location.href = config.contextPath + 'Chamados/Report';
    });

    $('#btnAdicionar').click(function () {
        window.location.href = config.contextPath + 'Chamados/Cadastrar';
    });
});
