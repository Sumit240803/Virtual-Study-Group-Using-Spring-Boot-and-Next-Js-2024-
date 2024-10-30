package com.easyacademics.learningtool.services;


import com.easyacademics.learningtool.dto.RegisterDto;
import com.easyacademics.learningtool.dto.Response;
import com.easyacademics.learningtool.dto.ScheduleRequest;
import com.easyacademics.learningtool.models.Group;
import com.easyacademics.learningtool.models.Notes;
import com.easyacademics.learningtool.models.Schedule;
import com.easyacademics.learningtool.models.User;
import com.easyacademics.learningtool.repository.GroupRepository;
import com.easyacademics.learningtool.repository.NotesRepository;
import com.easyacademics.learningtool.repository.ScheduleRepository;
import com.easyacademics.learningtool.repository.UserRepository;
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
    private final ScheduleRepository scheduleRepository;
    private final GroupRepository groupRepository;


    public UserService(BCryptPasswordEncoder passwordEncoder, UserRepository userRepository, NotesRepository notesRepository, ScheduleRepository scheduleRepository , GroupRepository groupRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.notesRepository = notesRepository;
        this.scheduleRepository = scheduleRepository;
        this.groupRepository = groupRepository;
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
        if (!user.getRequests().contains(loggedUser.getUsername())) {
            user.getRequests().add(loggedUser.getUsername());
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
        if (loggedUser.getRequests().contains(username)) {
            loggedUser.getFriends().add(username);
            loggedUser.getRequests().remove(username);
            user.getFriends().add(loggedUser.getUsername());
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
            loggedUser.getRequests().remove(username);
            userRepository.save(loggedUser);
            response.setMessage("Rejected");
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
            notesRepository.save(notes.get());
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

    //Schedules Functions

    public Response addSchedule(ScheduleRequest scheduleRequest){
        User loggedUser = getLoggedUser();
        Schedule schedule = new Schedule();
        schedule.setName(scheduleRequest.getName());
        schedule.setNote(scheduleRequest.getNote());
        schedule.setStart(scheduleRequest.getStart());
        schedule.setEnd(scheduleRequest.getEnd());
        schedule.setUserId(loggedUser.getId());
        scheduleRepository.save(schedule);
        Response response = new Response();
        response.setMessage("Schedule Added By User");
        return response;
    }

    public Response mySchedules(){
        User loggedUser = getLoggedUser();
        List<Schedule> schedules = scheduleRepository.findByUserId(loggedUser.getId());
        Response response = new Response();
        response.setMessage("Schedule Added By User");
        response.setSchedules(schedules);
        return response;
    }

    public Response scheduleById(String id){
        Optional<Schedule> optionalSchedule = scheduleRepository.findById(id);
        Response response = new Response();
        if(optionalSchedule.isPresent()){
        Schedule schedule = optionalSchedule.get();
        response.setMessage("Schedule Added By User");
        response.setSchedules(List.of(schedule));
        }else {
            response.setMessage("error");
        }
        return response;
    }

    public Response deleteSchedule(String id){
        Optional<Schedule> schedule = scheduleRepository.findById(id);
        Response response = new Response();
        if(schedule.isPresent()){
            scheduleRepository.deleteById(id);
            response.setMessage("Schedule Deleted");
        }else {
            response.setMessage("Error");
        }
        return response;
    }

    // Group Functions

    public Response myGroups(){
        User loggedUser = getLoggedUser();
        Response response = new Response();
        if(loggedUser.getGroups().isEmpty()){
            response.setMessage("No current groups");
            return response;
        }
        response.setGroups(loggedUser.getGroups());
        return response;
    }

    public Response leaveGroup(String id){
        Optional<Group> optionalGroup =  groupRepository.findById(id);
        User loggedUser = getLoggedUser();
        Response response = new Response();
        if(optionalGroup.isPresent()){
            Group group = optionalGroup.get();
            if(group.getMembersId().contains(loggedUser.getId())){
                loggedUser.getGroups().remove(id);
                response.setMessage("Group Left");
            }
        }
        return response;
    }

    public Response removeUserFromGroup(String groupId , String userId){
        User loggedUser = getLoggedUser();
        Optional<Group> group = groupRepository.findById(groupId);
        Response response = new Response();
        if(group.isPresent()){
            Group myGroup = group.get();
            if(myGroup.getAdmin().contains(loggedUser.getUsername())){
                myGroup.getMembersId().remove(userId);
                response.setMessage("Kicked User from Group");
            }else {
                response.setMessage("You are not an admin");
            }
        }
        return response;
    }

}
