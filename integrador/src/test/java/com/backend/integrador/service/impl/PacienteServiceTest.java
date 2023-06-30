package com.backend.integrador.service.impl;
import com.backend.integrador.dto.PacienteDto;
import com.backend.integrador.entity.Domicilio;
import com.backend.integrador.entity.Paciente;
import com.backend.integrador.exceptions.ResourceNotFoundException;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class PacienteServiceTest {

    @Autowired
    private PacienteService pacienteService;
    private static Paciente paciente;
    private static PacienteDto pacienteDto;

    @Test
    @Order(1)
    void buscarPacientePorId() {
        paciente = new Paciente("Tomi","Acosta","12345678", LocalDate.of(2023,06,30), new Domicilio("Calle",1,"Localidad","Provincia"));
        pacienteDto = pacienteService.guardarPaciente(paciente);
        Long id = paciente.getId();
        Assertions.assertEquals(pacienteDto.getId(),pacienteService.buscarPacientePorId(id).getId());
    }

    @Test
    @Order(2)
    void guardarPaciente() {
        paciente = new Paciente("Tomi","Acosta","12345678", LocalDate.of(2023,06,30), new Domicilio("Calle",1,"Localidad","Provincia"));
        pacienteDto = pacienteService.guardarPaciente(paciente);
        Assertions.assertEquals(paciente.getDni(), pacienteDto.getDni());
    }

    @Test
    @Order(3)
    void eliminarPaciente() throws ResourceNotFoundException {
        paciente = new Paciente("Tomi","Acosta","12345678", LocalDate.of(2023,06,30), new Domicilio("Calle",1,"Localidad","Provincia"));
        pacienteDto = pacienteService.guardarPaciente(paciente);
        Long id = paciente.getId();
        Assertions.assertEquals(pacienteDto.getId(),pacienteService.buscarPacientePorId(id).getId());
        pacienteService.eliminarPaciente(id);
        Assertions.assertNull(pacienteService.buscarPacientePorId(id));
    }
}