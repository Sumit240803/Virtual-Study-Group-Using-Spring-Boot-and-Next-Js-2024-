package com.easyacademics.learningtool.controllers;

import com.easyacademics.learningtool.dto.*;
import com.easyacademics.learningtool.models.User;
import com.easyacademics.learningtool.repository.UserRepository;
import com.easyacademics.learningtool.services.UserDetailsServiceImpl;
import com.easyacademics.learningtool.services.UserService;
import com.easyacademics.learningtool.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtUtils jwtUtils;
    @Autowired
    public UserController(UserService userService , JwtUtils jwtUtils,AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.jwtUtils = jwtUtils;
        this.authenticationManager =authenticationManager;
    }

    @PostMapping("/auth/register")
    public ResponseEntity<?> createUser(@RequestBody RegisterDto registerDto){
        try{
        userService.register(registerDto);
        return ResponseEntity.ok().body("User Created");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error Occurred : "+ e.getLocalizedMessage());
        }
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDto loginDto){
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsername(),loginDto.getPassword()));
            String token = jwtUtils.generateToken(loginDto.getUsername());
            Response Response = new Response();
            Response.setMessage(token);
            return ResponseEntity.ok().body(Response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error Occurred : "+ e.getLocalizedMessage());
        }
    }
    @PostMapping("/sendRequest")
        public ResponseEntity<?> sendRequest(@RequestBody SendRequest sendRequest){
            try {
                String  username =sendRequest.getUsername();
                Response response = userService.sendRequest(username);
                return ResponseEntity.ok().body(response);
            } catch (Exception e) {
                Response response = new Response();
                response.setMessage("Some error occurred");
                response.setError(e.getLocalizedMessage());
                return ResponseEntity.badRequest().body(response);
            }
    }

 }
