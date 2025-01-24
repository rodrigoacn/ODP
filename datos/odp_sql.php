<?php
class odp_sql { 
	private $query;
	public function __construct(){}

	public function getQuery(){
		return $this->query;
	}

	public function ObtenerProyectos(){
		$this->query="SELECT p.id AS id_proyecto, p.nombre AS nombre_proyecto, MAX(t.sprint) AS max_sprint_ticket FROM proyecto AS p, ticket AS t WHERE p.id = t.id_proyecto ORDER BY nombre_proyecto";
	}

	public function ObtenerTickets(){
		$this->query="SELECT id AS id_ticket, id_ticket AS ticket_dependiente, titulo AS titulo_ticket, descripcion AS descripcion_ticket, puntos AS puntos_ticket, sprint AS sprint_ticket, estado AS estado_ticket, fecha_inicio AS FROM ticket WHERE id_proyecto = :v_id_proyecto ORDER BY titulo_ticket, id_dependiente";
	}

	public function CrearProyecto(){
		$this->query="INSERT INTO proyecto(nombre_proyecto) VALUES (:v_nombre_proyecto)";
	}

	public function CrearTicket(){
		$this->query="INSERT INTO ticket(id, id_proyecto, id_ticket, titulo, descripcion, puntos, sprint, estado) VALUES(:v_id, :v_id_proyecto, :v_id_ticket, :v_titulo, :v_descripcion, :v_puntos, :v_sprint, :v_estado)";
	}

	public function VerSprint(){
		$this->query="SELECT MAX(t1.sprint), t1.id AS id_ticket, CASE t1.id_ticket = -1 THEN 'Independiente' ELSE t2.titulo END AS ticket_dependiente, t1.titulo AS titulo_ticket, t1.descripcion AS descripcion_ticket, t1.puntos AS puntos_ticket, t1.fecha_inicio AS fecha_inicio_ticket, t1.fecha_termino AS fecha_termino_ticket FROM ticket t1, ticket t2 WHERE t1.id_proyecto = :v_id_proyecto AND t1.id = t2.id_ticket";
	}

	public function ObtenerMaxIdTicket(){
		$this->query="SELECT MAX(id) AS max_id_ticket FROM ticket where id_proyecto = :v_id_proyecto";
	}

	public function EditarProyecto(){
		$this->query="UPDATE proyecto SET nombre = :v_nombre_proyecto WHERE id = :v_id_proyecto";
	}

	public function EliminarTIcketsDependientes(){
		$this->query="DELETE FROM ticket t1, ticket t2 WHERE t1.id_proyecto = :v_id_proyecto AND t1.id = t2.id_ticket";
	}

	public function EliminarProyecto(){
		$this->query="DELETE FROM proyecto p, ticket t WHERE p.id = :v_id_proyecto AND p.id = t.id_proyecto";
	}

	public function EditarTicket(){
		$this->query="UPDATE ticket SET titulo = :v_titulo_ticket, descripcion = :v_descripcion_ticket, sprint = :v_sprint_ticket, estado = :v_estado_ticket, puntos = :v_puntos_ticket, fecha_inicio = :v_finicio_ticket, fecha_termino = :v_ftermino_ticket WHERE id = :v_id_ticket";
	}

	public function EliminarTicketsDependientes2(){
		$this->query="DELETE FROM ticket WHERE id_ticket = :v_id_ticket";
	}

	public function EliminarTicket(){
		$this->query="DELETE FROM ticket WHERE id = :v_id_ticket";
	}

	public function ObtenerPromedioDia(){
		$this->query="SELECT fecha_termino, AVG(puntos) AS promedio_puntos FROM ticket WHERE id_proyecto = :v_id_proyecto AND fecha_termino BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) AND CURRENT_DATE() GROUP BY fecha_termino";
	}

	public function ObtenerPromedioSemana(){
		$this->query="SELECT WEEK(fecha_termino) AS semana, AVG(puntos) AS promedio_puntos FROM ticket WHERE id_proyecto = :v_id_proyecto AND fecha_termino BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 49 DAY) AND CURRENT_DATE() GROUP BY semana";
	}

	public function ObtenerPromedioMes(){
		$this->query="SELECT MONTH(fecha_termino) AS mes, AVG(puntos) AS promedio_puntos FROM ticket WHERE id_proyecto = :v_id_proyecto AND fecha_termino BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 210 DAY) AND CURRENT_DATE() GROUP BY mes";
	}

	public function VerificarEstadoTicket(){
		$this->query="SELECT estado AS estado_ticket FROM ticket WHERE id = :v_id_ticket";
	}

	public function CambiarEstadoTicket(){
		$this->query="UPDATE ticket SET estado = :v_estado WHERE id = :v_id_ticket";
	}
}
?>
		