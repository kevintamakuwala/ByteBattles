package com.bytebattles.controllers;

import com.bytebattles.services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VerifyController {
    @Autowired
    private AuthenticationService authenticationService;

    @GetMapping("/verify")
    public ResponseEntity<String> verifyUser(@RequestParam("code") String code) {
        if (authenticationService.verify(code)) {
                return ResponseEntity.ok("verify_success");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are already Verified or Something went wrong!!!");
        }
    }
}

