package com.backend.integrador.dto;


import com.backend.integrador.entity.Turno;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TurnoDto {
    private static final Logger LOGGER = LoggerFactory.getLogger(TurnoDto.class);

    private Long id;

    private String paciente;
    private String odontologo;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy'T'HH:mm")
    private LocalDateTime fechaYHora;

    public TurnoDto() {
    }

    public TurnoDto(Long id, String paciente, String odontologo, LocalDateTime fechaYHora) {
        this.id = id;
        this.paciente = paciente;
        this.odontologo = odontologo;
        this.fechaYHora = fechaYHora;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPaciente() {
        return paciente;
    }

    public void setPaciente(String paciente) {
        this.paciente = paciente;
    }

    public String getOdontologo() {
        return odontologo;
    }

    public void setOdontologo(String odontologo) {
        this.odontologo = odontologo;
    }

    public LocalDateTime getFechaYHora() {
        return fechaYHora;
    }

    public void setFechaYHora(LocalDateTime fechaYHora) {
        this.fechaYHora = fechaYHora;
    }

    public static TurnoDto fromTurno(Turno turno) {
        LOGGER.info(turno.toString());
        LOGGER.info(turno.getPaciente().toString());
        String paciente = turno.getPaciente().getNombre() + " " + turno.getPaciente().getApellido();
        String odontologo = turno.getOdontologo().getNombre() + " " + turno.getOdontologo().getApellido();
        return new TurnoDto(turno.getId(), paciente, odontologo, turno.getFechaYHora());
    }

}
