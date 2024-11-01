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
    private final UserRepository userRepository;

    public UserController(UserService userService , JwtUtils jwtUtils,AuthenticationManager authenticationManager,UserRepository userRepository) {
        this.userService = userService;
        this.jwtUtils = jwtUtils;
        this.authenticationManager =authenticationManager;
        this.userRepository = userRepository;
    }


    //Register - Tested

    @PostMapping("/auth/register")
    public ResponseEntity<?> createUser(@RequestBody RegisterDto registerDto){
        try{
            userService.register(registerDto);
        return ResponseEntity.ok().body("User Created");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error Occurred : "+ e.getLocalizedMessage());
        }
    }


    // Login - Tested

    @PostMapping("/auth/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDto loginDto){
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsername(),loginDto.getPassword()));
            String token = jwtUtils.generateToken(loginDto.getUsername());
            User user = userRepository.findByUsername(loginDto.getUsername());
            Response Response = new Response();
            Response.setUser(user);
            Response.setMessage(token);
            return ResponseEntity.ok().body(Response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error Occurred : "+ e.getLocalizedMessage());
        }
    }


    // Sending Requests - Tested


    @PostMapping("/sendRequest")
    public ResponseEntity<?> sendRequest(@RequestBody SendRequest sendRequest) {
        try {
            String friend = sendRequest.getUsername();
            Response response = userService.sendRequest(friend);
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            Response response = new Response();
            response.setMessage("Some error occurred");
            response.setError(e.getLocalizedMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    //Current User - Tested

    @GetMapping("/loggedUser")
    public ResponseEntity<?> getLoggedUser() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.isAuthenticated()) {
                Object principal = authentication.getPrincipal();
                String username = (principal instanceof UserDetails) ? ((UserDetails) principal).getUsername() : principal.toString();
                User user = userRepository.findByUsername(username);
                if (user == null) throw new RuntimeException("User not found");
                Response response = new Response();
                response.setMessage("");
                response.setUser(user);
                response.setError("");
                return ResponseEntity.ok().body(response);
            }
        } catch (Exception e) {
            Response response = new Response();
            response.setMessage("");
            response.setUser(null);
            response.setError(e.getLocalizedMessage());
            return ResponseEntity.ok().body(response);
        }
        return ResponseEntity.ok().body("Error");
    }

    //Accepting Friends - Tested

    @PostMapping("/acceptRequest")
    public ResponseEntity<?> acceptRequest(@RequestBody SendRequest sendRequest){
        try {
            Response response = userService.acceptRequest(sendRequest.getUsername());
            return ResponseEntity.ok().body(response);
        }catch (Exception e){
            Response response = new Response();
            response.setUser(null);
            response.setMessage("Error");
            response.setError(e.getLocalizedMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }


    //Getting ALl friends - Tested


    @GetMapping("/friends")
    public ResponseEntity<?> friends(){
        try {
            Response response = userService.getFriends();
            return ResponseEntity.ok().body(response);
        }catch (Exception e){
            Response response = new Response();
            response.setUser(null);
            response.setMessage("Error");
            response.setError(e.getLocalizedMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    // Getting Requests - Tested

    @GetMapping("/requests")
    public ResponseEntity<?> requests(){
        try {
            Response response = userService.requests();
            return ResponseEntity.ok().body(response);
        }catch (Exception e){
            Response response = new Response();
            response.setUser(null);
            response.setMessage("Error");
            response.setError(e.getLocalizedMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    // Reject Request  - Tested
    @PostMapping("/rejectRequest")
    public ResponseEntity<?> rejectRequests(@RequestBody SendRequest request){
        try {
            Response response = userService.rejectRequest(request.getUsername());
            return ResponseEntity.ok().body(response);
        }catch (Exception e){
            Response response = new Response();
            response.setUser(null);
            response.setMessage("Error");
            response.setError(e.getLocalizedMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    // Adding Notes - Tested
    @PostMapping("/addNote")
    public ResponseEntity<?> rejectRequests(@RequestBody NoteRequest noteRequest){
        try {
            Response response = userService.addNote(noteRequest.getSubject(),noteRequest.getNotes());
            return ResponseEntity.ok().body(response);
        }catch (Exception e){
            Response response = new Response();
            response.setUser(null);
            response.setMessage("Error");
            response.setError(e.getLocalizedMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    // Deleting notes - Tested
    @DeleteMapping("/deleteNote/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable String id){
        try{
            Response response = userService.deleteNote(id);
            return ResponseEntity.ok().body(response);
        }catch (Exception e){
            Response response = new Response();
            response.setUser(null);
            response.setMessage("Error");
            response.setError(e.getLocalizedMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    // Notes of User - Tested
    @GetMapping("/myNotes")
    public ResponseEntity<?> myNotes(){
        try{
            Response response = userService.myNotes();
            return ResponseEntity.ok().body(response);
        }catch (Exception e){
            Response response = new Response();
            response.setUser(null);
            response.setMessage("Error");
            response.setError(e.getLocalizedMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    // Add Schedule - Tested

    @PostMapping("/addSchedule")
    public ResponseEntity<?> addSchedule(@RequestBody ScheduleRequest scheduleRequest ){
        try{
            Response response = userService.addSchedule(scheduleRequest);
            return ResponseEntity.ok().body(response);
        }catch (Exception e){
            Response response = new Response();
            response.setUser(null);
            response.setMessage("Error");
            response.setError(e.getLocalizedMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    // Tested
    @GetMapping("/mySchedules")
    public ResponseEntity<?> mySchedules(){
        try{
            Response response = userService.mySchedules();
            return ResponseEntity.ok().body(response);
        }catch (Exception e){
            Response response = new Response();
            response.setUser(null);
            response.setMessage("Error");
            response.setError(e.getLocalizedMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    //Tested
    @GetMapping("/schedule/{id}")
    public ResponseEntity<?> schedule(@PathVariable String id){
        try{
            Response response = userService.scheduleById(id);
            return ResponseEntity.ok().body(response);
        }catch (Exception e){
            Response response = new Response();
            response.setUser(null);
            response.setMessage("Error");
            response.setError(e.getLocalizedMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    //tested
    @DeleteMapping("/deleteSchedule/{id}")
    public ResponseEntity<?> deleteSchedule(@PathVariable String id){
        try{
            Response response = userService.deleteSchedule(id);
            return ResponseEntity.ok().body(response);
        }catch (Exception e){
            Response response = new Response();
            response.setUser(null);
            response.setMessage("Error");
            response.setError(e.getLocalizedMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/joinedGroups")
    public ResponseEntity<?> myGroups(){
        try{
            Response response = userService.myGroups();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            Response response = new Response();
            response.setUser(null);
            response.setMessage("Error");
            response.setError(e.getLocalizedMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/leaveGroup/{id}")
    public ResponseEntity<?> leaveGroup(@PathVariable String id){
        try{
            Response response = userService.leaveGroup(id);
            return ResponseEntity.ok().body(response);
        }catch (Exception e) {
            Response response = new Response();
            response.setUser(null);
            response.setMessage("Error");
            response.setError(e.getLocalizedMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/kick/{groupId}/{userId}")
    public ResponseEntity<?> kickUser(@PathVariable String groupId , @PathVariable String userId){
        try{
            Response response = userService.removeUserFromGroup(groupId, userId);
            return ResponseEntity.ok().body(response);
        }catch (Exception e) {
            Response response = new Response();
            response.setUser(null);
            response.setMessage("Error");
            response.setError(e.getLocalizedMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

}
