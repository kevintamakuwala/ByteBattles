package com.bytebattles.controllers;

import com.bytebattles.models.ApplicationUser;
import com.bytebattles.models.LoginResponseDTO;
import com.bytebattles.models.RegistrationDTO;
import com.bytebattles.services.AuthenticationService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping({"/register", "/register/"})
    public ApplicationUser registerUser(@RequestBody RegistrationDTO body, HttpServletRequest request) throws MessagingException, UnsupportedEncodingException {
        return authenticationService.registerUser(body.getName(), body.getEmail(), body.getUsername(), body.getPassword(), getSiteURL(request));
    }

    @PostMapping({"/login", "/login/"})
    public LoginResponseDTO loginUser(@RequestBody RegistrationDTO body) {
        return authenticationService.loginUser(body.getName(), body.getEmail(), body.getUsername(), body.getPassword(),body.isEnabled());
    }

    private String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }
}   
