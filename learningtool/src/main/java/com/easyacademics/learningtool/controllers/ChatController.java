package com.easyacademics.learningtool.controllers;

import com.easyacademics.learningtool.models.Group;
import com.easyacademics.learningtool.models.Messages;
import com.easyacademics.learningtool.repository.GroupRepository;
import com.easyacademics.learningtool.repository.MessageRepository;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.util.Optional;

@Controller
public class ChatController {
    private final MessageRepository messageRepository;
    private final GroupRepository groupRepository;
    public ChatController(MessageRepository messageRepository,GroupRepository groupRepository){
        this.messageRepository = messageRepository;
        this.groupRepository = groupRepository;
    }

    @MessageMapping("/chat/{groupId}/sendMessage")
    @SendTo("/topic/{groupId}")
    public Messages sendMessage(@DestinationVariable String groupId , Messages messages){
        Optional<Group> optionalGroup = groupRepository.findById(groupId);
        if(optionalGroup.isPresent()){
            //GroupGroup = optionalGroup.get();
            messages.setGroupId(groupId);
        }
        messages.setTime(LocalDateTime.now());
        return messageRepository.save(messages);
    }


}
