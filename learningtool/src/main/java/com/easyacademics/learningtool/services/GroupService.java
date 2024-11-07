package com.easyacademics.learningtool.services;

import com.easyacademics.learningtool.dto.GroupDto;
import com.easyacademics.learningtool.dto.Response;
import com.easyacademics.learningtool.models.Group;
import com.easyacademics.learningtool.models.User;
import com.easyacademics.learningtool.repository.GroupRepository;
import com.easyacademics.learningtool.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class GroupService {
    private final GroupRepository groupRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    public GroupService(GroupRepository groupRepository, UserRepository userRepository ,UserService userService) {
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    public void createGroup(GroupDto groupDto) {
        User loggedUser = userService.getLoggedUser();

        // Create a new group object
        Group group = new Group();
        group.setName(groupDto.getName());

        // Set members of the group; if members are null, initialize with an empty list
        group.setMembersId((groupDto.getMembers() != null) ? groupDto.getMembers() : new ArrayList<>());

        // Add the logged-in user as a member of the new group
        if (!group.getMembersId().contains(loggedUser.getId())) {
            group.getMembersId().add(loggedUser.getId());
        }

        // Set the admin of the group
        group.setAdmin(loggedUser.getUsername());

        // Save the new group to the repository
        groupRepository.save(group);

        // Ensure the logged user’s groups list is initialized
        if (loggedUser.getGroups() == null) {
            loggedUser.setGroups(new ArrayList<>());
        }

        // Add the new group's ID to the user's groups if not already present
        if (!loggedUser.getGroups().contains(group.getId())) {
            loggedUser.getGroups().add(group.getId());
        }

        // Save the updated user object
        userRepository.save(loggedUser);

        // Adding additional members from groupDto
        if (groupDto.getMembers() != null) {
            for (String userId : groupDto.getMembers()) {
                Optional<User> user = userRepository.findById(userId);
                if (user.isPresent()) {
                    User groupMember = user.get();

                    // Initialize groups list if null
                    if (groupMember.getGroups() == null) {
                        groupMember.setGroups(new ArrayList<>());
                    }

                    // Add the new group ID to the group member's groups list if not already present
                    if (!groupMember.getGroups().contains(group.getId())) {
                        groupMember.getGroups().add(group.getId());
                        userRepository.save(groupMember);
                    }
                }
            }
        }
    }


    public void addUser(String groupId, List<String> membersId) {
        Optional<Group> group = groupRepository.findById(groupId);
        if (group.isPresent()) {
            Group myGroup = group.get();
            for (String userId : membersId) {
                if (!myGroup.getMembersId().contains(userId)) {
                    myGroup.getMembersId().add(userId);
                    Optional<User> user = userRepository.findById(userId);
                    if (user.isPresent()) {
                        User myMember = user.get();
                        if (!myMember.getGroups().contains(groupId)) {
                            myMember.getGroups().add(groupId);
                            userRepository.save(myMember);
                        }
                    }
                }
            }
            groupRepository.save(myGroup);
        } else {
            throw new RuntimeException("Group Not found");
        }
    }


}