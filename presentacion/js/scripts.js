obtenerDimensionPantalla = function () {
    return {
        ancho_pantalla: window.innerWidth,
        alto_pantalla: window.innerHeight,
    };
};

actualizarDimensionPantalla = function() {
    var dimensiones = obtenerDimensionPantalla();
    $("body").css("width", dimensiones.ancho_pantalla);
    console.log(dimensiones.ancho_pantalla);
    console.log(dimensiones.alto_pantalla);
    $("body").css("height", dimensiones.alto_pantalla);
    if($("#grafico").lenght){
        var ctx = $("#grafico")[0].getContext("2d");
        ctx.canvas.width = dimensiones.ancho_pantalla;
        ctx.canvas.height = dimensiones.alto_pantalla;
    }
};

$(window).on('resize', function() {
    actualizarDimensionPantalla();
});
actualizarDimensionPantalla();
ObtenerModales();
ObtenerProyectos();
cancelar = function() {
        $(".ventana-modal").hide();
        if($("#overlay").hasClass("active")){
            $("#overlay").removeClass("active");
        }
}

crearproyectos = function () {
    CrearProyecto($("#nombre_proyecto").val());
}

iracreartickets = function (element) {
    alert("hola");
    IrCrearTickets($(element).data("id"), $(element).val());
}

vertickets = function (element) {
    var ver_ticket = $(element).attr("class");
    alert("hola");
    ObtenerTickets($(element).data("id"), $(element).data("nombre"));
}

creartickets = function () {
    var tickets = {};
    $(".ticket").each(function(){
        tickets["llave"] = $(this).find(".hdn-llave").val();
        tickets["id_dependiente"] = $(this).find(".hdn-ticket-dependiente").val();
        tickets["titulo"] = $(this).find(".nombre_ticket").val();
        tickets["descripcion"] = $(this).find(".descripcion_ticket");
        tickets["puntos"] = $(this).find(".puntos_ticket");
    });
    CrearTickets($("#tks-id-proyecto").val(), tickets);
}

versprint = function (element) {
    VerSprint($(element).data("id"));
}

guardarproyecto = function (element) {
    GuardarProyecto($(element).data("id"), $(".txt-nombre-proyecto")[$(element).index()].val());
}

eliminarproyecto = function (element) {
    EliminarProyecto($(element).data("id"));
}

guardarticket = function (element) {
    EditarTicket($(element).data("id"), $(".txt-nombre-ticket")[$(element).index()].val(), $(".hdn-descripcion-ticket")[$(element).index()].val(), $(".nbr-sprint-editar")[$(element).index()].val(), $("slc-estado-editar option:selected")[$(element).index()].text(), $(".nbr-puntos-editar")[$(element).index()].val(), $(".dte-finicio-editar")[$(element).index()].val(), $(".dte-ftermino-editar")[$(element).index()].val());
}

agregarticketdependiente = function (element) {
    var llave = ObtenerLlave();
    $("#tickets").append(""
    +"<div class='ticket'>"
    +"  <input class='modal hdn-llave' type='hidden' value='"+llave+"'>"
    +"  <input class='modal hdn-ticket-dependiente' type='hidden' value='"+$(element).parent().prev(".independiente").find(".hdn-llave").first().val()+"'>"
    +"	<input class='modal nombre_ticket' type='text' placeholder='Nombre del ticket'>"
    +"  <textarea class='modal descripcion_ticket' placeholder='Descripción del Ticket'></textarea>"
    +"  <input type='number' class='modal puntos_ticket' value='1'>"
    +"  <input type='button' class='modal btn-ticket-dependiente' value='Ticket Dependiente'>"
    +"</div>"
    );  
}

agregarnuevoticket = function () {
    var llave = ObtenerLlave();
    $("#tickets").append(""
    +"<div class='ticket independiente'>"
    +"  <input class='modal hdn-llave' type='hidden' value='"+llave+"'>"
    +"  <input class='modal hdn-ticket-dependiente' type='hidden' value='-1'>"
    +"  <input class='modal nombre_ticket' type='text' placeholder='Nombre del ticket'>"
    +"  <textarea class='modal descripcion_ticket' placeholder='Descripción del Ticket'></textarea>"
    +"  <input type='number' class='modal puntos_ticket' value='1'>"
    +"  <input type='button' class='modal btn-ticket-dependiente' value='Ticket Dependiente'>"
    +"</div>"
    );
}

verdescripcionticket = function (element) {
    $(element).prev().show();
}

CrearGrafico = function(puntos, rango_tiempo){
    new Chart($("#grafico"), {
        type: "bar",
        data: {
            labels: etiquetas,
            datasets: [
            {
                label: "Puntos Obtenidos",
                backgroundColor: ["red"],
                data: puntos
            }
            ]
        },
        options: {
            responsive: true,
            legend: {
                display: false
            },
            title: {
                display: true,
                text: "Puntos por "+rango_tiempo
            },
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true
                }
            }
        }
    });
}

function allowDrop(e) {
    e.preventDefault();
}

function drag(e) {
    var id = e.target.id;
    var id_ticket = $("#"+id).find("hdn-id-ticket").val();
    var id_ticket_dependiente = $("#"+id).find("hdn-id-ticket-dependiente").val();
    e.dataTransfer.setData("id", id);
    e.dataTransfer.setData("id_ticket", id_ticket);
    e.dataTransfer.setData("id_ticket_dependiente", id_ticket_dependiente);
}

function drop(e, estado) {
    e.preventDefault();
    var id = e.dataTransfer.getData("id").toString();
    var id_ticket = e.dataTransfer.getData("id_ticket");
    var id_ticket_dependiente = e.dataTransfer.getData("id_ticket_dependiente");
    e.target.appendChild(document.getElementById(id));
    CambiarEstado(id_ticket, id_ticket_dependiente, estado);
}

if($(".carta").lenght){
    $(".carta").attr("draggable", "True");

    $(".carta").on("dragstart", function(e){
        drag(e);
    });

    $("#tickets_pendientes").on("drop", function(e){
        e.preventDefault();
        e.stopPropagation();
        drop(e, "pendiente");
    });
    
    $("#tickets_pendientes").on("dropover", function(e){
        e.preventDefault();
        e.stopPropagation();
        allowDrop(e);
    });

    $("#tickets_pendientes").on("drop", function(e){
        e.preventDefault();
        e.stopPropagation();
        drop(e, "pendiente");
    });
    
    $("#tickets_pendientes").on("dropover", function(e){
        e.preventDefault();
        e.stopPropagation();
        allowDrop(e);
    });

    $("#tickets_pendientes").on("drop", function(e){
        e.preventDefault();
        e.stopPropagation();
        drop(e, "pendiente");
    });
    
    $("#tickets_pendientes").on("dropover", function(e){
        e.preventDefault();
        e.stopPropagation();
        allowDrop(e);
    });

    $("#tickets_pendientes").on("drop", function(e){
        e.preventDefault();
        e.stopPropagation();
        drop(e, "pendiente");
    });
    
    $("#tickets_pendientes").on("dropover", function(e){
        e.preventDefault();
        e.stopPropagation();
        allowDrop(e);
    });
}