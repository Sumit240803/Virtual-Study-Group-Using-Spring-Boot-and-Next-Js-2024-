package com.easyacademics.learningtool.controllers;

import com.easyacademics.learningtool.dto.GroupDto;
import com.easyacademics.learningtool.services.GroupService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/group")
public class GroupController {
    private final GroupService groupService;
    public GroupController(GroupService groupService){
        this.groupService = groupService;
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

}
