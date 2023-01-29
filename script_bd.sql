CREATE TABLE proyecto(
    id BIGINT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
) ENGINE=InnoDB;

CREATE TABLE ticket(
    id BIGINT NOT NULL,
    id_proyecto BIGINT NOT NULL,
    id_ticket BIGINT,
    titulo VARCHAR(100) NOT NULL,
    descripcion VARCHAR(1000) NOT NULL,
    sprint TINYINT NOT NULL,
    estado VARCHAR(10) NOT NULL,
    puntos TINYINT NOT NULL,
    fecha_inicio DATE DEFAULT '1994-12-20',
    fecha_termino DATE DEFAULT '1994-12-20',
    PRIMARY KEY(id),
    FOREIGN KEY(id_proyecto) REFERENCES proyecto(id),
    FOREIGN KEY(id_ticket) REFERENCES ticket(id)
) ENGINE=InnoDB;