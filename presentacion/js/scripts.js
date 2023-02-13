(function() {
    obtenerDimensionPantalla = function () {
        return .val(){
            ancho_pantalla: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
            alto_pantalla: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
        };
    };

    actualizarDimensionPantalla = function() {
        var dimensiones = obtenerDimensionPantalla();
        $("body").css("width", dimensiones.ancho_pantalla);
        $("body").css("height", dimensiones.alto_pantalla);
    };

    getPercentageOfWindow = function() {
        return {
            x1: 0.5,
            y1: 0.5,
            x2: 0.5,
            y3: 0.5,
            x3: 1,
            y3: 0.5,
        };
    };

    getCanvasContext = function() {
        return {
            "grafico1": $("#grafico1")[0].getContext("2d"),
            "grafico2": $("#grafico2")[0].getContext("2d"),
            "grafico3": $("#grafico3")[0].getContext("2d")
        };
    };

    getViewportSize = function() {
        return {
            height: $("#graficos").height,
            width: $("#graficos").width
        };
    };

    updateSizes = function() {
        var viewportSize = getViewportSize();
        var percentage = getPercentageOfWindow();
        var ctx = getCanvasContext();
        if($("#seccion-actual").val() === "principal"){
            ctx.grafico1.canvas.height = 0;
            ctx.grafico1.canvas.width = 0;
            ctx.grafico2.canvas.height = 0;
            ctx.grafico2.canvas.width = 0;
            ctx.grafico3.canvas.height = 0;
            ctx.grafico3.canvas.width = 0;
            return;
        } else if($("#seccion-actual").val() !== "tareas"){
            ctx.grafico3.canvas.height = 0;
            ctx.grafico3.canvas.width = 0;
        } else{
            ctx.grafico3.canvas.height = viewportSize.height * percentage.y3;
            ctx.grafico3.canvas.width = viewportSize.width * percentage.x3;
        }
        ctx.grafico1.canvas.height = viewportSize.height * percentage.y1;
        ctx.grafico1.canvas.width = viewportSize.width * percentage.x1;
        ctx.grafico2.canvas.height = viewportSize.height * percentage.y2;
        ctx.grafico2.canvas.width = viewportSize.width * percentage.x2;
    };

    $(window).on('resize', function() {
        updateSizes();
        actualizarDimensionPantalla();
    });

    ObtenerModales();
    ObtenerProyectos();
}());

$(".cancelar").click(function(){
    $("[id^=modal]").hide();
    if($("#overlay").hasClass("active")){
        $("#overlay").removeClass("active");
    }
});

$("#btn-crear-proyecto").click(function(){
    CrearProyecto($("#nombre_proyecto").val());
});

$(".crear-tickets").click(function(){
    IrCrearTickets($(this).data("id"), $(this).val());
});

$(".ver-tickets").click(function(){
    ObtenerTickets($(this).data("id"), $(this).data("nombre"));
});

$("#btn-crear-proyecto").click(function(){
    CrearProyecto($("#nombre_proyecto").val());
});

$("#btn-crear-tickets").click(function(){
    var array_tickets = [];
    var i = 0;
    $(".ticket").each(function(){
        i++;
        array_tickets["id"] = $("#tks-id").val() + $(this).index();
        array_tickets["id_dependiente"] = $(this).find(".hdn-ticket-dependiente").val();
        array_tickets["titulo"] = $(this).find(".nombre_ticket").val();
        array_tickets["descripcion"] = $(this).find(".descripcion_ticket");
        array_tickets["puntos"] = $(this).find(".puntos_ticket");
    });
});

$(".ver-sprint").click(function(){
    VerSprint($(this).data("id"));
});

$(".guardar-proyecto").click(function(){
    GuardarProyecto($(this).data("id"), $(".txt-nombre-proyecto")[$(this).index()].val());
});

$(".eliminar-proyecto").click(function(){
    EliminarProyecto($(this).data("id"));
});

$(".guardar-ticket").click(function(){
    EditarTicket($(this).data("id"), $(".txt-nombre-ticket")[$(this).index()].val(), $(".hdn-descripcion-ticket")[$(this).index()].val(), $(".nbr-sprint-editar")[$(this).index()].val(), $("slc-estado-editar option:selected")[$(this).index()].text(), $(".nbr-puntos-editar")[$(this).index()].val(), $(".dte-finicio-editar")[$(this).index()].val(), $(".dte-ftermino-editar")[$(this).index()].val());
});

function CrearGrafico(puntos, rango_tiempo){
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
    e.dataTransfer.setData("id", );
    e.dataTransfer.setData("id_ticket", id_ticket);
}
  
function drop(e, estado) {
    e.preventDefault();
    var id = e.dataTransfer.getData("id").toString();
    var id_ticket = e.dataTransfer.getData("id_ticket");
    e.target.appendChild(document.getElementById(id));
    CambiarEstado(id_ticket, estado);
}

if($(".carta").lenght){
    $(".carta").attr("draggable", "True");

    $(".carta").on("dragstart", function(e){
        drag(e);
    });

    $("#tickets_pendientes").on("drop", function(e){
        e.preventDefault();
        e.stopPropagation();
        drop(e);
    });
    
    $("#tickets_pendientes").on("dropover", function(e){
        e.preventDefault();
        e.stopPropagation();
        allowDrop(e);
    });
}

$(".btn-ticket-dependiente").click(function(){
    $("#tickets").append(""
    +"<div class='ticket'>"
    +"  <input class='modal hdn-ticket-dependiente' type='hidden' value='"+(parseInt($("#tks-id").val())+$(this).index())+"'>"
    +"	<input class='modal nombre_ticket' type='text' placeholder='Nombre del ticket'>"
    +"  <textarea class='modal descripcion_ticket' placeholder='Descripción del Ticket'></textarea>"
    +"  <input type='number' class='modal puntos_ticket' value='1'>"
    +"  <input type='button' class='modal btn-ticket-dependiente' value='Ticket Dependiente'>"
    +"</div>"
    );
    
});

$("#btn-nuevo-ticket").click(function(){
    $("#tickets").append(""
    +"<div class='ticket'>"
    +"  <input class='modal hdn-ticket-dependiente' type='hidden' value='-1'>"
    +"  <input class='modal nombre_ticket' type='text' placeholder='Nombre del ticket'>"
    +"  <textarea class='modal descripcion_ticket' placeholder='Descripción del Ticket'></textarea>"
    +"  <input type='number' class='modal puntos_ticket' value='1'>"
    +"  <input type='button' class='modal btn-ticket-dependiente' value='Ticket Dependiente'>"
    +"</div>"
    );
});

$(".btn-descripcion-ticket").click(function(){
    $(this).prev().show();
    
});

