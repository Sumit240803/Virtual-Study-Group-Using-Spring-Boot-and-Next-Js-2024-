package com.easyacademics.learningtool.services;

import com.easyacademics.learningtool.dto.LoginDto;
import com.easyacademics.learningtool.dto.RegisterDto;
import com.easyacademics.learningtool.dto.Response;
import com.easyacademics.learningtool.models.Notes;
import com.easyacademics.learningtool.models.User;
import com.easyacademics.learningtool.repository.NotesRepository;
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
    private final NotesRepository notesRepository;


    public UserService(BCryptPasswordEncoder passwordEncoder, UserRepository userRepository,NotesRepository notesRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.notesRepository = notesRepository;
    }

    public void register(RegisterDto registerDto) {
        try {
            User user = userRepository.findByUsername(registerDto.getUsername());
            if (user != null) {
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

    public User getLoggedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
            String username = (principal instanceof UserDetails) ? ((UserDetails) principal).getUsername() : principal.toString();
            User user = userRepository.findByUsername(username);
            if (user == null) throw new RuntimeException("User not found");
            return user;
        }
        throw new RuntimeException("User Not Authenticated");
    }

    public Response sendRequest(String username) {
        User user = userRepository.findByUsername(username);
        User loggedUser = getLoggedUser();
        if (!user.getRequests().contains(loggedUser)) {
            user.getRequests().add(loggedUser);
            userRepository.save(user);
            Response response = new Response();
            response.setMessage("Request Sent");
            response.setUser(user);
            return response;
        } else {
            Response response = new Response();
            response.setMessage("Request Already Sent");
            return response;
        }

    }

    public Response acceptRequest(String username) {
        User user = userRepository.findByUsername(username);
        User loggedUser = getLoggedUser();
        if (loggedUser.getRequests().contains(user)) {
            loggedUser.getFriends().add(user);
            loggedUser.getRequests().remove(user);
            user.getFriends().add(loggedUser);
            userRepository.save(user);
            userRepository.save(loggedUser);
            Response response = new Response();
            response.setMessage("Request Accepted");
            return response;
        } else {
            Response response = new Response();
            response.setMessage("Request Does Not Exists");
            return response;
        }
    }


    // Getting friends

    public Response getFriends() {
        User loggedUser = getLoggedUser();
        Response response = new Response();
        if (loggedUser.getFriends().isEmpty()) {
            response.setMessage("No Friends Right Now");
        } else {
            response.setFriends(loggedUser.getFriends());
        }
        return response;
    }

    //  Requests

    public Response requests() {
        User loggedUser = getLoggedUser();
        Response response = new Response();
        if (loggedUser.getRequests().isEmpty()) {
            response.setMessage("No Requests Right Now");
        } else {
            response.setRequests(loggedUser.getRequests());
        }
        return response;
    }

    public Response rejectRequest(String username) {
        User user = userRepository.findByUsername(username);
        User loggedUser = getLoggedUser();
        Response response = new Response();
        if (!loggedUser.getRequests().isEmpty()) {
            loggedUser.getRequests().remove(user);
            userRepository.save(loggedUser);
        } else {
            response.setMessage("No Requests Right Now");
        }
        return response;
    }

    public Response addNote(String subject, String notes) {
        User loggedUser = getLoggedUser();
        Notes newNote = new Notes();
        newNote.setSubject(subject);
        newNote.setNotes(notes);
        newNote.setUserId(loggedUser.getId());
        loggedUser.getNotes().add(newNote);
        notesRepository.save(newNote);
        userRepository.save(loggedUser);
        Response response = new Response();
        response.setMessage("Note Added");
        return response;
    }

    public Response deleteNote(String id){
        User loggedUser = getLoggedUser();
        Optional<Notes> notes = notesRepository.findById(id);
        if(notes.isPresent() && loggedUser.getNotes().contains(notes.get())){
            notesRepository.deleteById(id);
        }
            Response response = new Response();
            response.setMessage("Note Deleted");
            return response;
    }

    public Response myNotes(){
        User loggedUser = getLoggedUser();
        List<Notes> notes = loggedUser.getNotes();
        Response response = new Response();
        response.setMessage("All Notes By User");
        response.setNotes(notes);
        return response;
    }

}
