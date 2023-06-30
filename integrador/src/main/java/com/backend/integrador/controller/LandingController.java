package com.backend.integrador.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class LandingController {
    @GetMapping("/")
    public String index(){
        return "index.html";
    }
}
