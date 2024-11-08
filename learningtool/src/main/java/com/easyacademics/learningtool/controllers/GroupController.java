package com.easyacademics.learningtool.controllers;

import com.easyacademics.learningtool.dto.GroupDto;
import com.easyacademics.learningtool.dto.Response;
import com.easyacademics.learningtool.models.Messages;
import com.easyacademics.learningtool.repository.MessageRepository;
import com.easyacademics.learningtool.services.GroupService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/group")
public class GroupController {
    private final GroupService groupService;
    private final MessageRepository messageRepository;
    public GroupController(GroupService groupService , MessageRepository messageRepository){
        this.groupService = groupService;
        this.messageRepository = messageRepository;
    }
    //Tested
    @PostMapping("/addGroup")
    public ResponseEntity<?> addGroup(@RequestBody GroupDto groupDto){
        groupService.createGroup(groupDto);
        return ResponseEntity.ok().body("Group Created");
    }
    //Tested
    @PostMapping("/{groupId}/addUser")
    public ResponseEntity<?> addUser(@PathVariable String groupId,@RequestBody GroupDto groupDto){
        groupService.addUser(groupId,groupDto.getMembers());
        return ResponseEntity.ok().body("User Added");
    }

    @GetMapping("/messages/{groupId}")
    public ResponseEntity<?> getMessage(@PathVariable String groupId , @RequestParam(defaultValue = "0") int page ,@RequestParam(defaultValue = "20") int size){
        try {
            Pageable pageable = PageRequest.of(page , size);
            Page<Messages> messages = messageRepository.findByGroupId(groupId , pageable);
            Response response = new Response();
            response.setMessages(messages.getContent());
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            Response response = new Response();
            response.setUser(null);
            response.setMessage("Error");
            response.setError(e.getLocalizedMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}