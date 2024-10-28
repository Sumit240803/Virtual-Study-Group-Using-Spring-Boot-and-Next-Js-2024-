package com.easyacademics.learningtool.services;

import com.easyacademics.learningtool.dto.LoginDto;
import com.easyacademics.learningtool.dto.RegisterDto;
import com.easyacademics.learningtool.dto.Response;
import com.easyacademics.learningtool.models.User;
import com.easyacademics.learningtool.repository.UserRepository;
import com.easyacademics.learningtool.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final BCryptPasswordEncoder passwordEncoder;

    private final UserRepository userRepository;



    @Autowired
    public UserService(BCryptPasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }
    public void register(RegisterDto registerDto){
        try{
            User user = userRepository.findByUsername(registerDto.getUsername());
            if(user!=null){
                throw new RuntimeException("User Already Exists");
            }
            User newUser = new User();
            newUser.setUsername(registerDto.getUsername());
            newUser.setName(registerDto.getName());
            newUser.setPassword(passwordEncoder.encode(registerDto.getPassword()));
            newUser.setEmail(registerDto.getEmail());
            newUser.setRole(List.of("ROLE_USER"));
            userRepository.save(newUser);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    public User getLoggedUser(){
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if(authentication!=null && authentication.isAuthenticated()){
                Object principal = authentication.getPrincipal();
                String username = (principal instanceof UserDetails) ? ((UserDetails) principal).getUsername() : principal.toString();
                User user = userRepository.findByUsername(username);
                if(user==null) throw new RuntimeException("User not found");
                return user;
            }
            throw new RuntimeException("User Not Authenticated");
    }

    public Response sendRequest(String username){
        User user= userRepository.findByUsername(username);
        User loggedUser = getLoggedUser();
        if(!user.getRequests().contains(loggedUser)){
            user.getRequests().add(loggedUser);
            userRepository.save(user);
            Response response = new Response();
            response.setMessage("Request Sent");
            return response;
        }else{
        Response response = new Response();
        response.setMessage("Request Already Sent");
        return response;
        }

    }
}
