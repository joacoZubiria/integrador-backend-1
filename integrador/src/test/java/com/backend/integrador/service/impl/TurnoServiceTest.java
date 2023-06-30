package com.backend.integrador.service.impl;

import com.backend.integrador.dto.OdontologoDto;
import com.backend.integrador.dto.PacienteDto;
import com.backend.integrador.dto.TurnoDto;
import com.backend.integrador.entity.Domicilio;
import com.backend.integrador.entity.Odontologo;
import com.backend.integrador.entity.Paciente;
import com.backend.integrador.entity.Turno;
import com.backend.integrador.exceptions.BadRequestException;
import com.backend.integrador.exceptions.ResourceNotFoundException;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.annotation.Order;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class TurnoServiceTest {
    @Autowired
    private TurnoService turnoService;
    @Autowired
    private PacienteService pacienteService;
    @Autowired
    private OdontologoService odontologoService;
    private static Odontologo odontologo;
    private static Paciente paciente;
    private static Turno turno;

    @BeforeAll
    public static void init(){
        paciente = new Paciente("Tomi","Acosta","12345678", LocalDate.of(2023,06,30), new Domicilio("Calle",1,"Localidad","Provincia"));
        odontologo = new Odontologo("123","Joaquin","Zubiria");
    }

    @Test
    @Order(1)
    void insertarTurno()throws BadRequestException{
        PacienteDto pacienteDto = pacienteService.guardarPaciente(paciente);
        OdontologoDto odontologoDto = odontologoService.registrarOdontologo(odontologo);
        TurnoDto turnoDto = turnoService.guardarTurno(new Turno(paciente,odontologo, LocalDateTime.of(LocalDate.of(2024,10,01), LocalTime.of(12,00))));
        Assertions.assertNotNull(turnoDto);
        Assertions.assertNotNull(turnoDto.getId());
        Assertions.assertEquals(turnoDto.getPaciente(),pacienteDto.getNombre()+" "+pacienteDto.getApellido());
        Assertions.assertEquals(turnoDto.getOdontologo(),odontologoDto.getNombre()+" "+odontologoDto.getApellido());
    }
    @Test
    @Order(2)
    void eliminarTurno()throws BadRequestException, ResourceNotFoundException {
        PacienteDto pacienteDto = pacienteService.guardarPaciente(paciente);
        OdontologoDto odontologoDto = odontologoService.registrarOdontologo(odontologo);
        TurnoDto turnoDto = turnoService.guardarTurno(new Turno(paciente,odontologo, LocalDateTime.of(LocalDate.of(2024,10,01), LocalTime.of(12,00))));
        Long id = turnoDto.getId();
        Assertions.assertEquals(id, turnoService.buscarTurnoPorId(id).getId());
        turnoService.eliminarTurno(id);
        Assertions.assertNull(turnoService.buscarTurnoPorId(id));
    }
    @Test
    @Order(3)
    void buscarTurno()throws BadRequestException{
        PacienteDto pacienteDto = pacienteService.guardarPaciente(paciente);
        OdontologoDto odontologoDto = odontologoService.registrarOdontologo(odontologo);
        TurnoDto turnoDto = turnoService.guardarTurno(new Turno(paciente,odontologo, LocalDateTime.of(LocalDate.of(2024,10,01), LocalTime.of(12,00))));
        Long id = turnoDto.getId();
        Assertions.assertEquals(id, turnoService.buscarTurnoPorId(id).getId());
    }
}