$(document).ready(function () {

    var table = $('#dataTables-Departamentos').DataTable({
        paging: false,
        ordering: false,
        info: false,
        searching: false,
        processing: true,
        serverSide: true,
        ajax: config.contextPath + 'Departamentos/Datatable',
        columns: [
            { data: 'ID' },
            { data: 'Descricao', title: 'Descrição' },
        ],
    });

    $('#dataTables-Departamentos tbody').on('dblclick', 'tr', function () {
        var data = table.row(this).data();
        if (data) {
            window.location.href = config.contextPath + 'Departamentos/Editar/' + data.ID;
        } else {
            Swal.fire({
                text: "Erro ao obter os dados do departamento.",
                icon: 'error'
            });
        }
    });


    $('#btnAdicionar').click(function () {
        var path = config.contextPath + 'Departamentos/Cadastrar';
        window.location.href = config.contextPath + 'Departamentos/Cadastrar';
    });

    $('#btnRelatorio').click(function () {
        window.location.href = config.contextPath + 'Departamentos/Report';
    });


});
