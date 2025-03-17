ObtenerModales = function(){
    $.ajax({
        type: "POST",
        url : "/ODP/presentacion/aj/odp_aj.php",
        data:({
            bandera: 1
        }),
        dataType: "html",
        beforeSend: function(){
        },
        complete: function(){
        },
        success: function(resultado){
            $("#modales").html(resultado);
        }
    });
}

IrCrearTickets = function(id_proyecto, max_sprint){
    $.ajax({
        type: "POST",
        url : "/ODP/presentacion/aj/odp_aj.php",
        data:({
            bandera: 2,
            id_proyecto: id_proyecto,
            max_sprint: max_sprint
        }),
        dataType: "html",
        beforeSend: function(){
        },
        complete: function(){
        },
        success: function(resultado){
            ObtenerModales();
            $("#modales").html(resultado);
            $("#modales").css("visibility", "visible");
        }
    });
}

ObtenerProyectos = function(){
    $.ajax({
        type: "POST",
        url : "/ODP/presentacion/aj/odp_aj.php",
        data:({
            bandera: 3
        }),
        dataType: "html",
        beforeSend: function(){
        },
        complete: function(){
        },
        success: function(resultado){
            $("#contenido").html(resultado);
        }
    });
}

ObtenerTickets = function(id_proyecto, nombre_proyecto){
    $.ajax({
        type: "POST",
        url : "/ODP/presentacion/aj/odp_aj.php",
        data:({
            bandera: 4,
            id_proyecto: id_proyecto,
            nombre_proyecto: nombre_proyecto
        }),
        dataType: "html",
        beforeSend: function(){
        },
        complete: function(){
        },
        success: function(resultado){
            $("#contenido").html(resultado);
        }
    });
}

CrearProyecto = function(nombre_proyecto){
    $.ajax({
        type: "POST",
        url : "/ODP/presentacion/aj/odp_aj.php",
        data:({
            bandera: 5,
            nombre_proyecto: nombre_proyecto
        }),
        dataType: "html",
        beforeSend: function(){
        },
        complete: function(){
        },
        success: function(resultado){
            $("#titulo-alerta").html("Proyecto creado correctamente");
            $("#modal-alerta").css("visibility", "visible");
        }
    });
}

VerSprint = function(id_proyecto){
    $.ajax({
        type: "POST",
        url : "/ODP/presentacion/aj/odp_aj.php",
        data:({
            bandera: 7,
            id_proyecto: id_proyecto
        }),
        dataType: "html",
        beforeSend: function(){
        },
        complete: function(){
        },
        success: function(resultado){
            $("#contenido").html(resultado);
        }
    });
}

GuardarProyecto = function(id_proyecto, nombre_proyecto){
    $.ajax({
        type: "POST",
        url : "/ODP/presentacion/aj/odp_aj.php",
        data:({
            bandera: 9,
            id_proyecto: id_proyecto,
            nombre_proyecto: nombre_proyecto
        }),
        dataType: "html",
        beforeSend: function(){
        },
        complete: function(){
        },
        success: function(resultado){
            $("#titulo-alerta").html("Proyecto editado correctamente");
            $("#modal-alerta").css("visibility", "visible");
        }
    });
}

EliminarProyecto = function(id_proyecto){
    $.ajax({
        type: "POST",
        url : "/ODP/presentacion/aj/odp_aj.php",
        data:({
            bandera: 10,
            id_proyecto: id_proyecto
        }),
        dataType: "html",
        beforeSend: function(){
        },
        complete: function(){
        },
        success: function(resultado){
            $("#titulo-alerta").html("Proyecto eliminado correctamente");
            $("#modal-alerta").css("visibility", "visible");
        }
    });
}

EditarTicket = function(id_ticket, titulo_ticket, descripcion_ticket, sprint_ticket, estado_ticket, puntos_ticket, finicio_ticket, ftermino_ticket){
    $.ajax({
        type: "POST",
        url : "/ODP/presentacion/aj/odp_aj.php",
        data:({
            bandera: 11,
            id_ticket: id_ticket,
            titulo_ticket: titulo_ticket,
            descripcion_ticket: descripcion_ticket,
            sprint_ticket: sprint_ticket,
            estado_ticket: estado_ticket,
            puntos_ticket: puntos_ticket,
            finicio_ticket: finicio_ticket,
            ftermino_ticket: ftermino_ticket
        }),
        dataType: "html",
        beforeSend: function(){
        },
        complete: function(){
        },
        success: function(resultado){
            $("#titulo-alerta").html("Ticket editado correctamente");
            $("#modal-alerta").css("visibility", "visible");
        }
    });
}

EliminarTicket = function(id_ticket){
    $.ajax({
        type: "POST",
        url : "/ODP/presentacion/aj/odp_aj.php",
        data:({
            bandera: 12,
            id_ticket: id_ticket
        }),
        dataType: "html",
        beforeSend: function(){
        },
        complete: function(){
        },
        success: function(resultado){
            $("#titulo-alerta").html("Ticket eliminado correctamente");
            $("#modal-alerta").css("visibility", "visible");
        }
    });
}

ObtenerPromedios = function(id_proyecto, rango_tiempo){
    $.ajax({
        type: "POST",
        url : "/ODP/presentacion/aj/odp_aj.php",
        data:({
            bandera: 13,
            id_proyecto: id_proyecto,
            rango_tiempo: rango_tiempo
        }),
        dataType: "html",
        beforeSend: function(){
        },
        complete: function(){
        },
        success: function(resultado){
            var puntos = [];
            $.each(resultado, function(i, item){
                puntos.push(item);
            });
            $("body").append("<canvas id='grafico' height='"+$("#contenido").height()+"' width='"+$("#contenido").width()+"'></canvas");
            CrearGrafico(puntos, rango_tiempo);
        }
    });
}

CambiarEstado = function(id_ticket, id_ticket_dependiente, estado){
    $.ajax({
        type: "POST",
        url: "/ODP/presentacion/aj/odp_aj.php",
        data: ({
            bandera: 14,
            id_ticket: id_ticket,
            id_ticket_dependiente: id_ticket_dependiente,
            estado: estado
        }),
        dataType: "html",
        beforeSend: function(){
        },
        complete: function(){
        },
        success: function(resultado){
            if(parseInt(resultado) === 0){
                $("#titulo-alerta").html("Este ticket depende de otro para cambiar de estado");
                $("#modal-alerta").css("visibility", "visible");
            }
        }
    });
}

ObtenerLlave = function(){
    $.ajax({
        type: "POST",
        url: "/ODP/presentacion/aj/odp_aj.php",
        data: ({
            bandera: 8
        }),
        dataType: "html",
        beforeSend: function(){
        },
        complete: function(){
        },
        success: function(resultado){
            return resultado;
        }
    });
}

CrearTickets = function(id_proyecto, tickets){
    $.ajax({
        type: "POST",
        url: "/ODP/presentacion/aj/odp_aj.php",
        data: ({
            bandera: 15,
            id_proyecto: id_proyecto,
            tickets: JSON.stringify(tickets)
        }),
        dataType: "html",
        beforeSend: function(){
        },
        complete: function(){
        },
        success: function(resultado){
            if(parseInt(resultado) === 0){
                $("#titulo-alerta").html("Tickets guardados");
                $("#modal-alerta").css("visibility", "visible");
            }
        }
    });
}