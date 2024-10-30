package com.easyacademics.learningtool.services;

import com.easyacademics.learningtool.dto.GroupDto;
import com.easyacademics.learningtool.models.Group;
import com.easyacademics.learningtool.models.User;
import com.easyacademics.learningtool.repository.GroupRepository;
import com.easyacademics.learningtool.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GroupService {
    private final GroupRepository groupRepository;
    private final UserRepository userRepository;

    public GroupService(GroupRepository groupRepository, UserRepository userRepository) {
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
    }

    public void createGroup(GroupDto groupDto) {
        Group group = new Group();
        group.setName(groupDto.getName());
        group.setMembersId(groupDto.getMembers());
        groupRepository.save(group);
        for (String userId : groupDto.getMembers()) {
            Optional<User> user = userRepository.findById(userId);
            if (user.isPresent()) {
                User groupMember = user.get();
                if (!groupMember.getGroups().contains(group.getId())) {
                    groupMember.getGroups().add(group.getId());
                    userRepository.save(groupMember);
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