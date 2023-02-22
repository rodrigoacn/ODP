<?php
ini_set("error_reporting", E_ALL & ~E_NOTICE);
ini_set("display_errors", 1);
include_once ("../../datos/conexion.php");
include_once ("../../negocios/odp_neg.php");

$USERCON = DB::connect();
$obj = new odp_neg($USERCON);
$obj1 = new odp_neg($USERCON);


switch ($bandera){
	case 1:
?>
<div id="modal-crear-proyecto" class="ventana-modal contenedor-primario">
	<h2>Crear Proyecto</h2>
	<input class="modal" id="nombre_proyecto" type="text" placeholder="Nombre del proyecto">
	<div class="modal contenedor-secundario">
		<input class="aceptar" id="btn-crear-proyecto" type="button" value="Crear">
		<input class="cancelar" type="button" value="Cancelar">
	</div>
</div>
<?php
	break;

	case 2:
?>
<div id="modal-crear-tickets" class="ventana-modal contenedor-primario">
	<input type="hidden" id="tks-id-proyecto" value="<?= $_POST["id_proyecto"] ?>">
	<input type="hidden" id="tks-sprint" value="<?= $_POST["max_sprint"] ?>">
	<input type="hidden" id="tks-id" value="<?= $_POST["max_id"] ?>">
	<h2>Crear Tickets</h2>
	<div class="ticket">
		<input class="modal hdn-ticket-dependiente" type="hidden" value="-1">
		<input class="modal nombre_ticket" type="text" placeholder="Nombre del ticket">
		<textarea class="modal descripcion_ticket" placeholder="Descripción del Ticket"></textarea>
		<input type="number" class="modal puntos_ticket" value="1">
		<input type="button" class="modal btn-ticket-dependiente" value="Ticket Dependiente">
	</div>
	<input type="button" id="btn-nuevo-ticket" class="modal" value="Nuevo Ticket">
	<div class="modal contenedor-secundario">
		<input class="aceptar" id="btn-crear-tickets" type="button" value="Crear">
		<input class="cancelar" type="button" value="Cancelar">
	</div>
</div>
<?php
	break;

	case 3:
		$obj->ObtenerProyectos();
?>
<div class="contenedor-primario">
	<table>
		<caption>Proyectos</caption>
		<tr>
			<th>Nombre</th>
			<th>Ver Sprint</th>
			<th>Ver Tickets</th>
			<th>Crear Tickets</th>
			<th>Guardar</th>
			<th>Eliminar</th>
		</tr>
<?php
		for($i = 0; $i < $obj->getFilas(); $i++){
			$obj->getSet_ODP($i);
?>
		<tr>
			<td><input type="text" class="txt-nombre-proyecto" value="<?= $obj->getNombreProyecto(); ?>"></td>
			<td><input type="button" class="ver-sprint" data-id="<?= $obj->getIdProyecto(); ?>" value="Ver Sprint"></td>
			<td><input type="button" class="ver-tickets" data-id="<?= $obj->getIdProyecto(); ?>" data-nombre="<?= $obj->getNombreProyecto(); ?>" value="Ver Tickets"></td>
			<td><input type="number" class="crear-tickets" data-id="<?= $obj->getIdProyecto(); ?>" value="<?= $obj->getMaxSprintTicket() == null ? 1 : $obj->getMaxSprintTicket(); ?>"></td>
			<td><input type="button" class="guardar-proyecto" data-id="<?= $obj->getIdProyecto(); ?>" value="Guardar"></td>
			<td><input type="button" class="eliminar-proyecto" data-id="<?= $obj->getIdProyecto(); ?>" value="Eliminar"></td>
		</tr>
<?php
		}
?>
	</table>
</div>
<?php
	break;

	case 4:
		$obj->ObtenerTickets($_POST["id_proyecto"]);
?>
<input type="button" id="atras" value="Atrás">
<div class="contenedor-primario">
	<table>
		<caption><?= $_POST["nombre_proyecto"]; ?> - Tickets</caption>
		<tr>
			<th>Nombre</th>
			<th>Descripcion</th>
			<th>Sprint</th>
			<th>Estado</th>
			<th>Puntos</th>
			<th>F. inicio</th>
			<th>F. termino</th>
			<th>Guardar</th>
			<th>Eliminar</th>
<?php
		for($i = 0; $i < $obj->getFilas(); $i++){
			$obj->getSet_ODP($i);
?>
		<tr>
			<td><input type="text" class="txt-nombre-ticket"<?= $obj->getTituloTicket(); ?>></td>
			<td><textarea class="hdn-descripcion-ticket"><?= $obj->getDescripcionTicket(); ?></textarea><input type="button" class="btn-descripcion-ticket" value="Ver Descripción"></td>
			<td><input type="number" class="nbr-sprint-editar" value="<?= $obj->getSprintTicket(); ?>"></td>
			<td><select class="slc-estado-editar">
<?php
			$pendiente = "";
			$ejecutandose = "";
			$probandose = "";
			$terminado = "";
			switch($obj->getEstadoTicket()){
				case "pendiente":
					$pendiente = " selected";
				break;

				case "ejecutandose":
					$ejecutandose = " selected";
				break;

				case "probandose":
					$probandose = " selected";
				break;

				case "terminado":
					$terminado = " selected";
				break;
			}
?>
				<option value="pendiente"<?= $pendiente; ?>>Pendiente</option>
				<option value="ejecutandose"<?= $ejecutandose; ?>>Ejecutandose</option>
				<option value="probandose"<?= $probandose; ?>>Probandose</option>
				<option value="terminado"<?= $terminado; ?>>Terminado</option>
			</select></td>
			<td><input type="number" class="nbr-puntos-editar" value="<?= $obj->getPuntosTicket(); ?>"></td>
			<td><input type="date" class="dte-finicio-editar" value="<?= $obj->getFechaInicioTicket(); ?>"></td>
			<td><input type="date" class="dte-ftermino-editar" value="<?= $obj->getFechaTerminoTicket(); ?>"></td>
			<td><input type="button" class="guardar-ticket" data-id="<?= $obj->getIdTicket(); ?>" value="Guardar"></td>
			<td><input type="button" class="eliminar-ticket" data-id-proyecto="<?= $_POST["id_proyecto"]; ?>" data-id="<?= $obj->getIdTicket(); ?>" value="Eliminar"></td>
		</tr>
<?php
		}
?>
	</table>
</div>
<?php
	break;

	case 5:
		$obj->CrearProyecto($_POST["nombre_proyecto"]);
	break;

	case 6:
		$tickets = json_decode($_POST["array_tickets"], true);

		foreach($tickets as $ticket){
			CrearTicket($ticket["id"], $_POST["id_proyecto"], $ticket["id_dependiente"], $ticket["titulo"], $ticket["descripcion"], $ticket["puntos"], $_POST["sprint"], "pendiente");
		}
	break;

	case 7:
		$tickets = obj->ObtenerUltimoSprint($_POST["id_proyecto"]);
		$tickets_pendientes = array();
		$tickets_ejecutandose = array();
		$tickets_probandose = array();
		$tickets_terminados = array();
		for($i = 0; $i < $obj->getFilas(); $i++){
			$obj->getSet_ODP($i);
			$ticket = array("id_ticket" => $obj->getIdTicket(), "ticket_dependiente" => $obj->getTicketDependiente(), "titulo_ticket" => $obj->getTituloTicket(), "descripcion_ticket" => $obj->getDescripcionTicket(),
			"puntos_ticket" => 
			$obj->getPuntosTicket(),
			"fecha_inicio_ticket" => $obj->getFechaInicioTicket(), "fecha_termino_ticket" => $obj->getFechaTerminoTicket());
			switch($obj->getEstadoTicket()){
				case "pendiente":
					array_push($tickets_pendientes, $ticket);
				break;

				case "ejecutandose":
					array_push($tickets_ejecutandose, $ticket);
				break;

				case "probandose":
					array_push($tickets_probandose, $ticket);
				break;

				case "terminado":
					array_push($tickets_terminados, $ticket);
				break;
			}
		}
?>
<div class="contenedor-tickets">
	<div id="tickets_pendientes">
<?php
		$i = 0;
		foreach($tickets_pendientes as $ticket_pendiente){
			$i++;

?>
		<div id="<?= $i; ?>" class="carta">
			<input type="hidden" class="hdn-id-ticket" value="<?= $ticket_pendiente["id_ticket"]; ?>">
			<input type="hidden" class="hdn-id-ticket-dependiente" value="<?= $ticket_pendiente["ticket_¨dependiente"]; ?>">
			<h2><?= $ticket_pendiente["titulo_ticket"]; ?></h2>
			<p>Depende de: <?= $ticket_pendiente["ticket_dependiente"]; ?></p>
			<p>F. Inicio: <?= $ticket_pendiente["fecha_inicio_ticket"]; ?></p>
			<textarea class="hdn-descripcion-ticket"><?= $ticket_pendiente["descripcion_ticket"]; ?></textarea>
			<input type="button" class="btn-descripcion-ticket" value="Ver Descripción">
			<p>Puntos: <?= $ticket_pendiente["puntos_ticket"] ?></p>
		</div>
<?php
		}
?>
	</div>
	<div id="tickets_ejecutandose">
<?php
		foreach($tickets_ejecutandose as $ticket_ejecutando){
			$i++;

?>
		<div id="<?= $i; ?>" class="carta">
			<input type="hidden" class="hdn-id-ticket" value="<?= $ticket_ejecutando["id_ticket"]; ?>">
			<input type="hidden" class="hdn-id-ticket-dependiente" value="<?= $ticket_ejecutando["ticket_¨dependiente"]; ?>">
			<h2><?= $ticket_ejecutando["titulo_ticket"]; ?></h2>
			<p>Depende de: <?= $ticket_ejecutando["ticket_dependiente"]; ?></p>
			<p>F. Inicio: <?= $ticket_ejecutando["fecha_inicio_ticket"]; ?></p>
			<textarea class="hdn-descripcion-ticket"><?= $ticket_ejecutando["descripcion_ticket"]; ?></textarea>
			<input type="button" class="btn-descripcion-ticket" value="Ver Descripción">
			<p>Puntos: <?= $ticket_ejecutando["puntos_ticket"] ?></p>
		</div>
<?php
		}
?>
	</div>
	<div id="tickets_probandose">
<?php
		foreach($tickets_probandose as $ticket_probandose){
			$i++;

?>
		<div id="<?= $i; ?>" class="carta">
			<input type="hidden" class="hdn-id-ticket" value="<?= $ticket_probandose["id_ticket"]; ?>">
			<input type="hidden" class="hdn-id-ticket-dependiente" value="<?= $ticket_probandose["ticket_¨dependiente"]; ?>">
			<h2><?= $ticket_probandose["titulo_ticket"]; ?></h2>
			<p>Depende de: <?= $ticket_probandose["ticket_dependiente"]; ?></p>
			<p>F. Inicio: <?= $ticket_probandose["fecha_inicio_ticket"]; ?></p>
			<input type="hidden" class="hdn-descripcion-ticket" value="<?= $ticket_probandose["descripcion_ticket"]; ?>">
			<input type="button" class="btn-descripcion-ticket" value="Ver Descripción">
			<p>Puntos: <?= $ticket_probandose["puntos_ticket"] ?></p>
		</div>
<?php
		}
?>
	</div>
	<div id="tickets_terminados">
<?php
		foreach($tickets_terminados as $ticket_terminado){
			$i++;

?>
		<div id="<?= $i; ?>" class="carta">
			<input type="hidden" class="hdn-id-ticket" value="<?= $ticket_terminado["id_ticket"]; ?>">
			<input type="hidden" class="hdn-id-ticket-dependiente" value="<?= $ticket_terminado["ticket_¨dependiente"]; ?>">
			<h2><?= $ticket_terminado["titulo_ticket"]; ?></h2>
			<p>Depende de: <?= $ticket_terminado["ticket_dependiente"]; ?></p>
			<p>F. Inicio: <?= $ticket_terminado["fecha_inicio_ticket"]; ?></p>
			<textarea class="hdn-descripcion-ticket"><?= $ticket_terminado["descripcion_ticket"]; ?></textarea>
			<input type="button" class="btn-descripcion-ticket" value="Ver Descripción">
			<p>Puntos: <?= $ticket_terminado["puntos_ticket"] ?></p>
		</div>
<?php
		}
?>
	</div>
</div>
<?php
	break;

	case 8:
?>
		<?= $obj->getMaxIdTicket($_POST["id_proyecto"]); ?>
<?php
	break;

	case 9:
		$obj->EditarProyecto($_POST["id_proyecto"], $_POST["nombre_proyecto"]);
	break;

	case 10:
		$obj->EliminarTicketsDependientes($_POST["id_proyecto"]);
		$obj->EliminarProyecto($_POST["id_proyecto"]);
	break;

	case 11:
		$obj->EditarTicket($_POST["id_ticket"], $_POST["titulo_ticket"], $_POST["descripcion_ticket"], $_POST["sprint_ticket"], $_POST["estado_ticket"], $_POST["puntos_ticket"], $_POST["finicio_ticket"], $_POST["ftermino_ticket"]);
	break;

	case 12:
		$obj->EliminarTicketsDependientes2($_POST["id_ticket"]);
		$obj->EliminarTicket($_POST["id_ticket"]);
	break;

	case 13:
		switch($_POST["rango_tiempo"]){
			case "Día":
				$obj->ObtenerPromedioDia($_POST["id_proyecto"]);
			break;

			case "Semana":
				$obj->ObtenerPromedioSemana($_POST["id_proyecto"]);
			break;

			case "Mes":
				$obj->ObtenerPromedioMes($_POST["id_proyecto"]);
			break;
		}	

		for($i = 0; $i < $obj->getFilas(); $i++){
			$obj->getSet_ODP($i);
			echo $obj->getPromedioPuntos();
		}
	break;

	case 14:
		if($_POST["id_ticket_dependiente"] != -1){
			echo 0;
		} else{
			$obj
			echo 1;
		}
	break;
}
