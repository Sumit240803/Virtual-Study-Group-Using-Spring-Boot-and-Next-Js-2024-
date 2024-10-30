package com.easyacademics.learningtool.controllers;

import com.easyacademics.learningtool.dto.GroupDto;
import com.easyacademics.learningtool.services.GroupService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/group")
public class GroupController {
    private final GroupService groupService;
    public GroupController(GroupService groupService){
        this.groupService = groupService;
    }

    @PostMapping("/addGroup")
    public ResponseEntity<?> addGroup(GroupDto groupDto){
        groupService.createGroup(groupDto);
        return ResponseEntity.ok().body("Group Created");
    }

    @PostMapping("/{groupId}/addUser")
    public ResponseEntity<?> addUser(@PathVariable String groupId, GroupDto groupDto){
        groupService.addUser(groupId,groupDto.getMembers());
        return ResponseEntity.ok().body("User Added");
    }
}
