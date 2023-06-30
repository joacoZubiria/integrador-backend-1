package com.backend.integrador.service.impl;

import com.backend.integrador.dto.OdontologoDto;
import com.backend.integrador.entity.Odontologo;
import com.backend.integrador.exceptions.ResourceNotFoundException;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class OdontologoServiceTest {

    @Autowired
    private OdontologoService odontologoService;
    private static Odontologo odontologo;
    private static OdontologoDto odontologoDto;

    @Test
    @Order(1)
    void buscarOdontologoPorId() {
        odontologo = new Odontologo("123","Martin","Acosta");
        odontologoDto = odontologoService.registrarOdontologo(odontologo);
        Long id = odontologo.getId();
        Assertions.assertEquals(odontologoDto.getId(),odontologoService.buscarOdontologoPorId(id).getId());
    }

    @Test
    @Order(2)
    void registrarOdontologo() {
        odontologo = new Odontologo("123","Martin","Acosta");
        odontologoDto = odontologoService.registrarOdontologo(odontologo);
        Assertions.assertEquals(odontologo.getMatricula(),odontologoDto.getMatricula());
    }

    @Test
    @Order(3)
    void eliminarOdontologo() throws ResourceNotFoundException {
        odontologo = new Odontologo("123","Martin","Acosta");
        odontologoDto = odontologoService.registrarOdontologo(odontologo);
        Long id = odontologoDto.getId();
        Assertions.assertEquals(odontologo.getId(),odontologoService.buscarOdontologoPorId(id).getId());
        odontologoService.eliminarOdontologo(id);
        Assertions.assertNull(odontologoService.buscarOdontologoPorId(id));
    }
}